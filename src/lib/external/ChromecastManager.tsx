// Interfaces
import { IThirdPartyScript } from './ThirdPartyServices';
// Utils
import logger from '@utils/logger';
// Actions
import { closeCastPlayerAction, openCastPlayerAction } from '@actions/cast-player';
import { 
  chromecastActiveAction, 
  chromecastInactiveAction, 
  chromecastAvailableAction, 
  chromecastUnavailableAction, 
  setChromecastVideoStateAction
} from '@actions/chromecast';
import { Dispatch } from 'redux';

declare interface CastReceiverMessage {
  type: string;
  value: string;
}

/**
 * Google Cast Service
 * 
 * Connects and send messages to a chromecast receiver
 */
class ChromecastManager implements IThirdPartyScript {
  /**
   * Redux state instance
   */
  private state: IPrismState;

  /**
   * Redux dispatch function
   */
  private dispatch: Dispatch;

  /**
   * Panflix chromecast receiver message types 
   */
  private messageTypes = {
    'LOG-ENABLED': 'LOG-ENABLED',
    'SLIDE-SHOW': 'SLIDE-SHOW',
    'VIDEO': 'VIDEO',
    'PLAY': 'PLAY',
    'PAUSE': 'PAUSE',
    'STOP': 'STOP',
    'FORWARD': 'FORWARD',
    'REWIND': 'REWIND',
    'SEEKTO': 'SEEKTO',
    'SETLOGIN': 'SETLOGIN'
  };

  /**
   * Constructor, initializes redux store if provided
   * @param store Redux state instance
   * @param dispatch Redux dispatch function
   */
  constructor(state?: IPrismState, dispatch?: Dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  }

  /**
   * Sends a message to Panflix chromecast receiver
   * @param messageType A Panflix chromecast receiver message type
   * @param value A Panflix chromecast receiver message value
   */
  private sendMessage = (messageType: string, value: string, content?: any) => {
    const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
    
    if (castSession) {
      castSession.sendMessage(process.env.REACT_APP_CAST_RECEIVER_NAMESPACE, {
        type: messageType,
        value: value,
        ...content
      });
    }
  }

  private handleMessage = (sessionState: string) => (namespace: string, message: string) => {
    logger.info('GoogleCastScript', `Message received: ${namespace} - ${message}`);
    const msg: CastReceiverMessage = JSON.parse(message);
    switch (msg.type) {
      case 'VIDEO':
        this.dispatch(setChromecastVideoStateAction(msg));
        if (sessionState === 'SESSION_RESUMED') {
          setTimeout(() => this.resumePlayer(), 50);
        }
        break;
    }
  }

  /**
   * Loads and initialize google cast framework
   */
  public init = (): void => {
    logger.info('GoogleCastScript', 'Initializing service');
    
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
    document.body.appendChild(script);
    
    window['__onGCastApiAvailable'] = (isAvailable: boolean) => {
      if (isAvailable) {
        this.initializeCastApi();
      }
    };
  };

  /**
   * Initialize and control cast state
   */
  public initializeCastApi = (): void => {
    logger.info('GoogleCastScript', 'Initializing Cast API');
    
    const context = window.cast.framework.CastContext.getInstance();
    
    context.setOptions({
      receiverApplicationId: process.env.REACT_APP_CAST_RECEIVER_APPLICATION_ID,
      autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
    
    // Controls the availability of a cast device
    context.addEventListener(
      window.cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      (event: any) => {
        try {
          
          switch (event.castState) {
            case window.cast.framework.CastState.NO_DEVICES_AVAILABLE:
              this.dispatch(chromecastUnavailableAction());
              break;
            case window.cast.framework.CastState.CONNECTED:
              this.dispatch(chromecastAvailableAction());
            default:
              this.dispatch(chromecastAvailableAction());
              break;
          }
        } catch (e) {

        }
      }
    );
    
    // Controls the connection state of a cast device
    context.addEventListener(
      window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      (event: any) => {
        try {
          const deviceName = this.getDeviceName();
          switch (event.sessionState) {
            case window.cast.framework.SessionState.SESSION_STARTED:
              this.dispatch(chromecastActiveAction(deviceName));
              event.session.addMessageListener(process.env.REACT_APP_CAST_RECEIVER_NAMESPACE, this.handleMessage(event.sessionState));
              this.sendLoginMessage();
              break;
            case window.cast.framework.SessionState.SESSION_ENDED:
              this.dispatch(chromecastInactiveAction());
              this.dispatch(closeCastPlayerAction());
              break;
            case window.cast.framework.SessionState.SESSION_RESUMED:
              this.dispatch(chromecastActiveAction(deviceName));
              event.session.addMessageListener(process.env.REACT_APP_CAST_RECEIVER_NAMESPACE, this.handleMessage(event.sessionState));
          }
        } catch (e) {
          
        }
      }
    );
  };

  public resumePlayer() {
    logger.info('GoogleCastScript', 'Resuming player');
    const { chromecast } = this.state;
    const { pid } = chromecast.videoContent;
    const moviePid = pid.split('|')[0];
    const parentPid = pid.split('|')[1];

    if (chromecast.videoContent.playerState === 'PLAYING') {
      this.dispatch(openCastPlayerAction({ moviePid, parentPid }));
    }
  }

  public sendLoginMessage = () => {
    logger.info('GoogleCastScript', 'Sending login message');
    const user = this.state.user.data;
    const { fullName: fullname, avatarUrl: imageurl } = user;

    return this.sendMessage(this.messageTypes['SETLOGIN'], '', { fullname, imageurl });
  }

  /**
   * Sends a display log message
   */
  public sendDisplayLogMessage = () => {
    logger.info('GoogleCastScript', 'Log Enabled');
    return this.sendMessage(this.messageTypes['LOG-ENABLED'], '');
  }

  /**
   * Sends a load channel message
   * @param channelPid Channel PID
   */
  public sendLoadChannelMessage = (channelPid: string = '') => {
    logger.info('GoogleCastScript', `Sending load channel message: ${channelPid}`);
    return this.sendMessage(this.messageTypes['SLIDE-SHOW'], channelPid);
  }

  /**
   * Sends a load media message
   * @param mediaPid media PID
   * @param contentPid content PID
   */
  public sendLoadMediaMessage = (mediaUrl: string, contentPid: string) => {
    logger.info('GoogleCastScript', `Sending load media message: ${mediaUrl} ${contentPid}`);
    const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaInfo = new window.chrome.cast.media.MediaInfo(mediaUrl, 'application/x-mpegURL');
    const request = new window.chrome.cast.media.LoadRequest(mediaInfo);

    castSession.loadMedia(request).then(
      () => { 
        logger.info('GoogleCastScript', 'Load succeed');
        this.setPlayerController();
      },
      (errorCode) => { 
        logger.error('GoogleCastScript', 'Error code: ' + errorCode);
      }
    );

    // return this.sendMessage(this.messageTypes.VIDEO, mediaPid, { pid: contentPid });
  }

  public setPlayerController = () => {
    logger.info('GoogleCastScript', 'Configuring playerController');
    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    playerController.addEventListener(
      window.cast.framework.RemotePlayerEventType.ANY_CHANGE,
      (event) => {
        console.log(event);
        switch(event.field) {
          case 'currentTime':
            this.dispatch(setChromecastVideoStateAction({ content: { currentTime: event.value } }));
            break;
          case 'playerState':
            this.dispatch(setChromecastVideoStateAction({ content: { playerState: event.value }}));
            break;
          case 'mediaInfo':
            if (event.value !== null) {
              this.dispatch(setChromecastVideoStateAction({ content: { duration: event.value.duration }}));
            }
        }
      }
    );
  }

  /**
   * Sends a play message
   */
  public sendPlayMessage = () => {
    logger.info('GoogleCastScript', 'Sending play message');
    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    playerController.playOrPause();

    //return this.sendMessage(this.messageTypes.PLAY, '');
  }

  /**
   * Sends a pause message
   */
  public sendPauseMessage = () => {
    logger.info('GoogleCastScript', 'Sending pause message');
    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    playerController.playOrPause();
    // return this.sendMessage(this.messageTypes.PAUSE, '');
  }

  /**
   * Sends a stop message
   */
  public sendStopMessage = () => {
    logger.info('GoogleCastScript', 'Sending stop messsage');
    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    playerController.stop();
    //return this.sendMessage(this.messageTypes.STOP, '');
  }

  /**
   * Sends a forward message
   */
  public sendForwardMessage = () => {
    logger.info('GoogleCastScript', 'Sending forward messsage');
    // return this.sendMessage(this.messageTypes.FORWARD, '');

    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    player.currentTime = player.currentTime + 15;
    playerController.seek();
  }

  /**
   * Sends a rewind message
   */
  public sendRewindMessage = () => {
    logger.info('GoogleCastScript', 'Sending rewind messsage');


    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);

    player.currentTime = player.currentTime - 15;
    playerController.seek();
  }

  public sendSeekToMessage = (value: number) => {
    logger.info('GoogleCastScript', `Sending seekto message: ${value}`);

    const player = new window.cast.framework.RemotePlayer();
    const playerController = new window.cast.framework.RemotePlayerController(player);
    
    player.currentTime = value;
    playerController.seek();

    // return this.sendMessage(this.messageTypes.SEEKTO, value.toString());
  }

  public setVolume = (value: number) => {
    logger.info('GoogleCastScript', `Setting volume value to: ${value}`);
    return window.cast.framework.CastContext.getInstance().getCurrentSession().setVolume(value);
  }
  
  public getVolume = (): number => {
    const volume = window.cast.framework.CastContext.getInstance().getCurrentSession().getVolume();
    logger.info('GoogleCastScript', `Volume value: ${volume}`);

    return volume;
  }

  public getDeviceName = () => {
    return window.cast.framework.CastContext.getInstance().getCurrentSession().getCastDevice().friendlyName;
  }

}

export default ChromecastManager;
