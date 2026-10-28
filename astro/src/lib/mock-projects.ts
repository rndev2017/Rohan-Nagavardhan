import type {Project, ProjectDetail, WritingPanel} from './queries';

const placeholder = (key: string, text: string): WritingPanel => ({
  _type: 'writingPanel', _key: key,
  content: [{
    _type: 'block', _key: `${key}-block`, style: 'normal', markDefs: [],
    children: [{_type: 'span', _key: `${key}-text`, marks: [], text}],
  }],
});

export const mockProject = {
  _type: 'project', _id: 'dev-test-book', title: 'Test book',
  slug: {_type: 'slug', current: 'test-book'}, status: 'in_progress',
  description: 'Just a test book with placeholder text.',
  spreads: [
    {_type: 'oneColumnSpread', _key: 'opening', panels: [placeholder('intro', 'Page one. Imagine something cool here.')]},
    {_type: 'twoColumnSpread', _key: 'pair', panels: [
      placeholder('left', 'Left page. Lorem ipsum dolor sit amet.'),
      placeholder('right', 'Right page. More placeholder nonsense.'),
    ]},
    {_type: 'twoColumnSpread', _key: 'more-text', panels: [
      placeholder('long', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Just filling some space to test the book.'),
      placeholder('short', 'Something goes here eventually.'),
    ]},
    {_type: 'twoColumnSpread', _key: 'blank-text', panels: [
      {_type: 'blankPanel', _key: 'blank'},
      placeholder('beside-blank', 'A deliberately blank page on the left. This one has words.'),
    ]},
    {_type: 'oneColumnSpread', _key: 'closing', panels: [placeholder('end', 'The end. That is the test book.')]},
  ],
} satisfies Project & ProjectDetail;

export const mockProjects: Project[] = [mockProject];
