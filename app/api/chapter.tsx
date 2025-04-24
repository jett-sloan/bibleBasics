import axios from 'axios';

const BIBLE_ID = '65eec8e0b60e656b-01';
const API_KEY = 'd7fc7aa1fade33c877cc9465be00a6e8';
const BASE_URL = 'https://api.scripture.api.bible/v1';

export const bookCodes: Record<string, string> = {
  genesis: 'GEN', exodus: 'EXO', leviticus: 'LEV', numbers: 'NUM', deuteronomy: 'DEU',
  joshua: 'JOS', judges: 'JDG', ruth: 'RUT', '1 samuel': '1SA', '2 samuel': '2SA',
  '1 kings': '1KI', '2 kings': '2KI', '1 chronicles': '1CH', '2 chronicles': '2CH',
  ezra: 'EZR', nehemiah: 'NEH', esther: 'EST', job: 'JOB', psalms: 'PSA',
  proverbs: 'PRO', ecclesiastes: 'ECC', 'song of solomon': 'SNG', isaiah: 'ISA',
  jeremiah: 'JER', lamentations: 'LAM', ezekiel: 'EZK', daniel: 'DAN',
  hosea: 'HOS', joel: 'JOL', amos: 'AMO', obadiah: 'OBA', jonah: 'JON',
  micah: 'MIC', nahum: 'NAM', habakkuk: 'HAB', zephaniah: 'ZEP', haggai: 'HAG',
  zechariah: 'ZEC', malachi: 'MAL', matthew: 'MAT', mark: 'MRK',
  luke: 'LUK', john: 'JHN', acts: 'ACT', romans: 'ROM', '1 corinthians': '1CO',
  '2 corinthians': '2CO', galatians: 'GAL', ephesians: 'EPH', philippians: 'PHP',
  colossians: 'COL', '1 thessalonians': '1TH', '2 thessalonians': '2TH',
  '1 timothy': '1TI', '2 timothy': '2TI', titus: 'TIT', philemon: 'PHM',
  hebrews: 'HEB', james: 'JAS', '1 peter': '1PE', '2 peter': '2PE',
  '1 john': '1JN', '2 john': '2JN', '3 john': '3JN', jude: 'JUD', revelation: 'REV'
};

export async function fetchChapters(bookKey: string, range: string, studyContent: any, imageMap: any) {
  const bookCode = bookCodes[bookKey];
  if (!bookCode) return [];

  const chapterNums = range?.toString().match(/\d+/g);
  if (!chapterNums) return [];

  const start = Number(chapterNums[0]);
  const end = Number(chapterNums[chapterNums.length - 1]);
  const fetchedChapters = [];

  for (let i = start; i <= end; i++) {
    const chapterId = `${bookCode}.${i}`;
    const res = await axios.get(`${BASE_URL}/bibles/${BIBLE_ID}/chapters/${chapterId}`, {
      headers: { 'api-key': API_KEY },
    });

    const content = res.data?.data?.content;
    const extras = studyContent[bookKey]?.[`${i}`] ?? null;
    const imageKey = `${bookKey}${i}`;
    const image = imageMap[imageKey];

    if (content) {
      fetchedChapters.push({
        chapter: `${bookCode} ${i}`,
        html: content,
        summary: extras?.summary,
        image: image ?? null,
        title: extras?.title,
      });
    }
  }

  return fetchedChapters;
}
