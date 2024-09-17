import { FileContentType } from "../types";

export function formatTitle(filename: string) {
  // Remover conteúdo entre colchetes e extensões
  let formatted = filename
    .replace(/\[.*?\]/g, '') // Remove conteúdo entre []
    .replace(/\.\w+$/, '')   // Remove a extensão do arquivo (ex: .mp4, .mkv)

    // Substituir pontos ou múltiplos hifens por espaço único
    .replace(/[\.\-_]+/g, ' ')

    // Manter episódios e temporadas (ex: S02E03)
    .replace(/\b([Ss]\d{2}[Ee]\d{2})\b/g, ' $1 ')

    // Remover resoluções, codecs, e metadados desnecessários
    .replace(/\b(\d{3,4}p|WEB-DL|BDRip|Dual|AAC|x264|5\.1|F-HD|HD|Multiple Subtitle)\b/gi, '')

    // Remover espaços extras
    .trim()
    .replace(/\s{2,}/g, ' ')

    // Remove parentesis sem conteúdo interno
    .replace(/[()]/g, ''); // Remove apenas os parênteses

  // Capitalizar palavras, exceto as de ligação
  formatted = formatted.replace(/\b\w+/g, (word, index) => {
    const ignoreWords = ['de', 'no', 'wa', 'os', 'do'];
    return ignoreWords.includes(word.toLowerCase()) && index !== 0
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return formatted;
}

export function identifyContentType(fileName: string): FileContentType {
  const seriesRegex = [
    /S(\d{2})E(\d{2})/i, // Ex: S01E01 (Formato comum)
    /(?:Part\s+(\d+)\s+-\s+)?(\d{2})/i, // Ex: Part 1 - 01 (Formato específico)
    /-(\d{2})/ // Ex: - 01 (Formato simples)
  ];

  const movieKeywords = ["Filme", "Movie"];

  // Verificar se o nome do arquivo corresponde ao formato de série
  for (const regex of seriesRegex) {
    const match = fileName.match(regex);
    if (match) {
      const season = match[1] ? parseInt(match[1]) : 1; // Se não houver "Part", assume-se que é temporada 1
      const episode = parseInt(match[match.length - 1]);

      // Extrair o título da série removendo números de episódio/temporada e outras tags
      const seriesTitle = fileName
        .replace(regex, '') // Remove a parte da temporada/episódio
        .replace(/\[.*?\]/g, '') // Remove as tags entre colchetes
        .replace(/(\.mkv|\.mp4|\.avi)$/i, '') // Remove a extensão do arquivo
        .trim(); // Remove espaços em branco

      return {
        contentType: 'SERIES',
        series: {
          seriesTitle,
          seasonNumber: season,
          episodeNumber: episode
        }
      };
    }
  }

  // Verificar se é um filme baseado em palavras-chave
  if (movieKeywords.some(keyword => fileName.toLowerCase().includes(keyword.toLowerCase()))) {
    return { contentType: 'MOVIE' };
  }

  // Padrão para arquivos de filmes (quando não forem séries)
  return { contentType: 'MOVIE' };
}
