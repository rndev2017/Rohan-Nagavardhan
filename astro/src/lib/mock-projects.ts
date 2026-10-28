import type {Project, ProjectDetail, ResolvedPanel, WritingPanel} from './queries';

// Real image assets, fixed here so the test book needs no Sanity query or CMS edits.
const photos = [
  {
    title: 'Ferry',
    altText: 'Passengers sit in a dim ferry cabin, silhouetted against bright windows overlooking the water.',
    image: {_type: 'image', asset: {_type: 'reference', _ref: 'image-0fc4081d5831af8d9eda6a6e896ba918eeb826c4-3129x1042-jpg'}},
  },
  {
    title: 'Welcome to T-Mobile Park',
    altText: "A man sits on an orange stool beside an escalator at T-Mobile Park, with Seattle's skyline in the distance.",
    image: {_type: 'image', asset: {_type: 'reference', _ref: 'image-38f270788c9271541f9826bf6a86bdbed1c396b8-6667x4439-jpg'}},
  },
  {
    title: 'In-N-Out',
    altText: 'A worker pulls a handcart piled with red produce through a sunny plaza as people eat at picnic tables nearby.',
    image: {_type: 'image', asset: {_type: 'reference', _ref: 'image-7b3763bc25db8b49fefdb51ecbb8d2c455798c35-3130x2075-jpg'}},
  },
] satisfies NonNullable<Project['thumbnail']>[];

const photoPanel = (index: number, key: string): ResolvedPanel => ({
  _type: 'photoPanel', _key: key, photo: photos[index],
});

const writing: WritingPanel = {
  _type: 'writingPanel', _key: 'writing',
  content: [{
    _type: 'block', _key: 'intro', style: 'normal', markDefs: [],
    children: [{
      _type: 'span', _key: 'text', marks: [],
      text: 'A local test book for trying out the reader. Move through the spreads to compare a wide photograph, paired photographs, writing beside a photograph, and a deliberately blank page.',
    }],
  }],
};

export const mockProject: ProjectDetail = {
  _type: 'project', _id: 'dev-test-book', title: 'Test book',
  slug: {_type: 'slug', current: 'test-book'}, status: 'in_progress',
  description: 'Development fixture · photographs, writing, and blank pages.',
  thumbnail: photos[1],
  spreads: [
    {_type: 'oneColumnSpread', _key: 'wide-photo', panels: [photoPanel(0, 'wide')]},
    {_type: 'twoColumnSpread', _key: 'paired-photos', panels: [photoPanel(1, 'left'), photoPanel(2, 'right')]},
    {_type: 'twoColumnSpread', _key: 'writing-photo', panels: [writing, photoPanel(1, 'right')]},
    {_type: 'twoColumnSpread', _key: 'blank-photo', panels: [{_type: 'blankPanel', _key: 'blank'}, photoPanel(2, 'right')]},
    {_type: 'oneColumnSpread', _key: 'closing-writing', panels: [writing]},
  ],
};

// Catalog queries return unresolved references, just like Sanity does.
export const mockProjects: Project[] = [{
  ...mockProject,
  spreads: mockProject.spreads.map((spread) => ({
    ...spread,
    panels: spread.panels.map((panel) => panel._type === 'photoPanel'
      ? {...panel, photo: {_type: 'reference', _ref: `dev-${panel.photo?.image.asset._ref}`}}
      : panel),
  })) as Project['spreads'],
}];
