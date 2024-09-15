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
