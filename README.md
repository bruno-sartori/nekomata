[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/bruno-sartori) ![Build Passing](https://img.shields.io/badge/Build-Passing-green.svg) 


<h1 style="text-align: center;">Nekomata</h1>

A content management component that can be attached to any web application.

Nekomata is a Node.js Web Components package designed to simplify the upload of multiple video files and the registration of associated metadata. This package is ideal for integration into external platforms.

## Features

- **Multiple File Upload**: Upload multiple video files simultaneously.
- **Automatic Metadata Registration**: When a video file is uploaded, Nekomata automatically get metadata so that you can save time typing, some of the metadata include:
  - Title
  - Director
  - Cast
  - Content Type (Series or Movie)
  - For Series: Series Number and Episode Number
  - Parental Control
  - FFPROBE result
- **Storage and Transmuxing**: Videos and their metadata are saved in an API, allowing transmuxing to different formats.
- **Video Editor**: Edit your videos before uploading!

## Getting Started

Install the project's dependencies:

```shell
yarn add @bsartori/weeb-logger
```

Build and enable build watching:

```shell
yarn build && yarn build:watch
```

Start development server:

```shell
yarn dev
```

## Production Use

import Nekomata in your project:

```js
import '@bsartori/nekomata';
```

And on your body tag, put the Nekomata app component:

```html
<body>
  <nekomata-main></nekomata-main>
</body>
```

And that's it! the component will be rendered in your application. If you run in some trouble see **Common Issues** section.

See the result:

![Nekomata Example 1](https://raw.githubusercontent.com/bruno-sartori/nekomata/main/docs/examples/nekomata1.jpg)

![Nekomata Example 2](https://raw.githubusercontent.com/bruno-sartori/nekomata/main/docs/examples/nekomata2.jpg)

![Nekomata Example 3](https://raw.githubusercontent.com/bruno-sartori/nekomata/main/docs/examples/nekomata3.jpg)

![Nekomata Example 4](https://raw.githubusercontent.com/bruno-sartori/nekomata/main/docs/examples/nekomata4.jpg)


## Generated Metadata

* FFPROBE result
```JSON
{
  "streams": [
    {
      "index": 0,
      "codec_name": "h264",
      "codec_long_name": "",
      "profile": "Main",
      "codec_type": "video",
      "codec_tag_string": "[0][0][0][0]",
      "codec_tag": "0x00000000",
      "width": 0,
      "height": 0,
      "codec_width": 1280,
      "codec_height": 720,
      "closed_captions": 0,
      "has_b_frames": 0,
      "pix_fmt": "yuv420p",
      "level": 31,
      "color_range": "unknown",
      "color_primaries": "unknown",
      "chroma_location": "left",
      "refs": 0,
      "is_avc": "",
      "nal_length_size": "",
      "sample_fmt": "u8",
      "sample_rate": "0",
      "channels": 0,
      "channel_layout": "0 channels",
      "bits_per_sample": 0,
      "r_frame_rate": "24000/1001",
      "avg_frame_rate": "24000/1001",
      "time_base": "1/1000",
      "start_pts": 0,
      "start_time": "0.000000",
      "duration_ts": 0,
      "duration": "-9223372036854776.000000",
      "bit_rate": "0",
      "bits_per_raw_sample": "8",
      "nb_frames": "0",
      "disposition": {
        "default": 1,
        "dub": 0,
        "original": 0,
        "comment": 0,
        "lyrics": 0,
        "karaoke": 0,
        "forced": 0,
        "hearing_impaired": 0,
        "visual_impaired": 0,
        "clean_effects": 0,
        "attached_pic": 0,
        "timed_thumbnails": 0
      },
      "tags": {
        "language": "jpn",
        "BPS-eng": "4013076",
        "DURATION-eng": "00:24:13.494000000",
        "NUMBER_OF_FRAMES-eng": "34849",
        "NUMBER_OF_BYTES-eng": "729122852",
        "_STATISTICS_WRITING_APP-eng": "mkvmerge v44.0.0 ('Domino') 64-bit",
        "_STATISTICS_WRITING_DATE_UTC-eng": "2020-07-15 10:17:57",
        "_STATISTICS_TAGS-eng": "BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES"
      }
    }, 
  ],
  "chapters": [],
  "format": {
    "filename": "[Erai-raws] Mahou Shoujo Madoka Magica - 04 [720p][Multiple Subtitle].mkv",
    "nb_streams": 22,
    "nb_programs": 0,
    "format_name": "matroska,webm",
    "format_long_name": "Matroska / WebM",
    "start_time": "0.000000",
    "duration": "1453.611000",
    "size": "753343960",
    "bit_rate": "4146055",
    "probe_score": 100,
    "tags": {
      "encoder": "libebml v1.3.10 + libmatroska v1.5.2",
      "creation_time": "2020-07-15T10:17:57.000000Z"
    }
  }
}
```

* TheMovieDB result:
```JSON
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/bYxnvBgl1mY2Qu26Zmg4zINrhgo.jpg",
      "genre_ids": [
        16,
        9648,
        10765,
        18
      ],
      "id": 94523,
      "origin_country": [
        "JP"
      ],
      "original_language": "ja",
      "original_name": "マギアレコード 魔法少女まどか☆マギカ外伝",
      "overview": "Few people know the truth: the world is safe thanks to the Magical Girls who are forced to slay Witches. Even though these girls are putting their lives on the line for a wish, rumors say they can be saved in Kamihama City. That’s where Iroha Tamaki is headed in search of answers; she can’t remember the wish she made to Kyubey.",
      "popularity": 166.958,
      "poster_path": "/ySz7DoQvwaZLvQ3b5DbUOteATE.jpg",
      "first_air_date": "2020-01-05",
      "name": "Magia Record: Puella Magi Madoka☆Magica Side Story",
      "vote_average": 7,
      "vote_count": 68
    },
    {
      "adult": false,
      "backdrop_path": "/lW2deyLDrwcYO2iHCuVpj7r1FnQ.jpg",
      "genre_ids": [
        16,
        18,
        10765
      ],
      "id": 39218,
      "origin_country": [
        "JP"
      ],
      "original_language": "ja",
      "original_name": "魔法少女まどか☆マギカ",
      "overview": "She has a loving family and best friends, laughs and cries from time to time... Madoka Kaname, an eighth grader of Mitakihara middle school, is one of those who lives such a life. One day, she had a very magical encounter. She doesn't know if it happened by chance or by fate yet. This is a fateful encounter that can change her destiny. This is a beginning of the new story of the magical witch girls.",
      "popularity": 75.065,
      "poster_path": "/q6e0NopVJRN8CiJ0ZVpIxabsyBY.jpg",
      "first_air_date": "2011-01-07",
      "name": "Puella Magi Madoka Magica",
      "vote_average": 8.064,
      "vote_count": 304
    }
  ],
  "total_pages": 1,
  "total_results": 2
}
```

* OMDB Result:
```JSON
{
  "Title": "Puella Magi Madoka Magica",
  "Year": "2011",
  "Rated": "TV-14",
  "Released": "07 Jan 2011",
  "Runtime": "24 min",
  "Genre": "Animation, Action, Adventure",
  "Director": "N/A",
  "Writer": "Ume Aoki, Atsuhiro Iwakami, Akiyuki Shinbô",
  "Actors": "Aoi Yûki, Chiwa Saitô, Emiri Kato",
  "Plot": "One night, 14-year-old Madoka Kaname has a terrible nightmare - against the backdrop of a devastated city, she witnesses a girl fight a losing battle against a dreadful being lingering above, while a cat-like magical creature tells Madoka the only way to change that tragic outcome is for her to make a contract with him and become a magical girl. The next day, the teen's dream seemingly becomes reality as the girl she saw in her dream - Homura - arrives at Mitakihara Middle School as a transfer student, mysteriously warning Madoka to stay just the way she is. But when later on she and her best friend Sayaka encounter the same cat-like magical creature from her dream - who introduces himself as Kyubey - the pair discovers that magical girls are real, and what's more, they can choose to become one. All they must do is sign a contract with Kyubey and agree to take on the duty to fight abstract beings called 'witches' that spread despair to the human world, and in return, each one of them will be granted any single wish they desire. However, as Homura's omen suggests, there might be far more to becoming a magical girl than Madoka and Sayaka realize.",
  "Language": "Japanese",
  "Country": "Japan",
  "Awards": "3 wins & 2 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZGYyZDlhY2YtMmYwNC00YjM3LWEwZDEtMTRhOWI5NDViM2NlXkEyXkFqcGdeQXVyMjk0NTE0NA@@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.2/10"
    }
  ],
  "Metascore": "N/A",
  "imdbRating": "8.2",
  "imdbVotes": "11,714",
  "imdbID": "tt1773185",
  "Type": "series",
  "totalSeasons": "1",
  "Response": "True"
}
```

## Commom Issues

Module not found: Error: Can't resolve './styles/nekomata.style' in '/home/User/Path/To/@bsartori/nekomata/dist'
Did you mean 'nekomata.style.js'?

You may need to add this to your `webpack.config.js` file
```js
{
  ...
  module: {
    ...
    rules: [
      ...
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  }
}

```


## Roadmap 
Would love Pull requests that build towards these objectives and even ideas for new objectives :3

* File Upload performance and robustness
 - [x] Spawn multiple web workers to handle file uploads
 - [x] Multipart Upload and Resumable Uploads -> Split file in smaller chunks to send them separately. Managing upload failures and being able to re-send files who fails without having to send the entire file again.
 - [x] Resume uploads even if the application was closed
 - [x] Integrity check
 - [x] Dynamize chunk size based on network settings on file upload initialization and throttle requests to avoid overcharging the server.
 - [ ] Change chunk size based on network settings when upload is in progress
 - [ ] Improve performance using Rust WASM in front-end and back-end
* Metadata generation
 - [x] Discover from filename if content is series or movie and get season/episode number
 - [x] Fetch video metadata from external APIs
 - [ ] Use some AI or another technique to determine sections in video file.
* Video Editor
 - [ ] Finish UI
 - [ ] Determine which features the video editor will have
 - [ ] Determine which features can be done on Front-End by WASM
 - [ ] Determine which features will be done in the Back-End
* General
 - [ ] Tests
 - [ ] Add a CI pipeline that runs the tests
 - [ ] Increase customization options
 - [ ] Organize this mess I call code :laughing:

## Technologies used in this project

| Name           | Description                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| [Node.js](https://nodejs.org/en)                                      | Node.js is a Javascript runtime build on Chrome`s V8 JavaScript                 |
| [Lit](https://lit.dev/)                                            | Lit is a simple library for building fast, lightweight web components that work in any framework, or with no framework at all. With Lit you can build shareable components, applications, design systems, and more.                                       |
| [Web Assembly](https://webassembly.org/) | WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.  |
| [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) | Web Workers makes it possible to run a script operation in a background thread separate from the main execution thread of a web application.  |
| [I18N](https://www-archive.mozilla.org/docs/reflist/i18n/i18n-guidelines) | i18n is an abbreviation for internationalization, which is the process of designing and developing products to be adaptable to different languages, cultures, and regions. Lit provides a [Localization API](https://lit.dev/docs/localization/overview/) in which this can be done.   |\
| [Typescript](https://www.typescriptlang.org)                          | Typescript extends JavaScript by adding types to the language                    |



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
