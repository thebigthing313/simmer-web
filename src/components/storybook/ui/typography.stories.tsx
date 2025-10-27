import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Blockquote,
	H1,
	H2,
	H3,
	H4,
	InlineCode,
	Large,
	Lead,
	Muted,
	P,
} from '@/components/typography';

const meta = {
	title: 'UI/Typography',
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<
	| typeof H1
	| typeof H2
	| typeof H3
	| typeof H4
	| typeof P
	| typeof Blockquote
	| typeof InlineCode
	| typeof Lead
	| typeof Large
	| typeof Muted
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1Story: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>scroll-m-20</code> (scroll margin 5rem)</li><li><code>text-4xl</code> (font size 2.25rem)</li><li><code>font-extrabold</code> (font weight 800)</li><li><code>tracking-tight</code> (letter spacing -0.025em)</li><li><code>lg:text-5xl</code> (large screen font size 3rem)</li></ul>',
			},
		},
	},
	render: () => <H1>Heading 1</H1>,
};

export const H2Story: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>scroll-m-20</code> (scroll margin 5rem)</li><li><code>border-b</code> (bottom border)</li><li><code>pb-2</code> (padding bottom 0.5rem)</li><li><code>text-3xl</code> (font size 1.875rem)</li><li><code>font-semibold</code> (font weight 600)</li><li><code>tracking-tight</code> (letter spacing -0.025em)</li><li><code>first:mt-0</code> (first child margin top 0)</li></ul>',
			},
		},
	},
	render: () => <H2>Heading 2</H2>,
};

export const H3Story: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>scroll-m-20</code> (scroll margin 5rem)</li><li><code>text-2xl</code> (font size 1.5rem)</li><li><code>font-semibold</code> (font weight 600)</li><li><code>tracking-tight</code> (letter spacing -0.025em)</li></ul>',
			},
		},
	},
	render: () => <H3>Heading 3</H3>,
};

export const H4Story: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>scroll-m-20</code> (scroll margin 5rem)</li><li><code>text-xl</code> (font size 1.25rem)</li><li><code>font-semibold</code> (font weight 600)</li><li><code>tracking-tight</code> (letter spacing -0.025em)</li></ul>',
			},
		},
	},
	render: () => <H4>Heading 4</H4>,
};

export const PStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>leading-7</code> (line height 1.75rem)</li><li><code>not-first:mt-6</code> (margin top 1.5rem for non-first children)</li></ul>',
			},
		},
	},
	render: () => <P>This is a paragraph of text.</P>,
};

export const BlockquoteStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>mt-6</code> (margin top 1.5rem)</li><li><code>border-l-2</code> (left border width 2px)</li><li><code>pl-6</code> (padding left 1.5rem)</li><li><code>italic</code> (italic font style)</li></ul>',
			},
		},
	},
	render: () => <Blockquote>This is a blockquote.</Blockquote>,
};

export const InlineCodeStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>relative</code> (position relative)</li><li><code>rounded</code> (border radius 0.25rem)</li><li><code>bg-muted</code> (background color muted)</li><li><code>px-[0.3rem]</code> (horizontal padding 0.3rem)</li><li><code>py-[0.2rem]</code> (vertical padding 0.2rem)</li><li><code>font-mono</code> (monospace font)</li><li><code>text-sm</code> (font size 0.875rem)</li><li><code>font-semibold</code> (font weight 600)</li></ul>',
			},
		},
	},
	render: () => <InlineCode>inline code</InlineCode>,
};

export const LeadStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>text-xl</code> (font size 1.25rem)</li><li><code>text-muted-foreground</code> (text color muted foreground)</li></ul>',
			},
		},
	},
	render: () => <Lead>This is lead text.</Lead>,
};

export const LargeStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>text-lg</code> (font size 1.125rem)</li><li><code>font-semibold</code> (font weight 600)</li></ul>',
			},
		},
	},
	render: () => <Large>Large text</Large>,
};

export const MutedStory: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'Tailwind classes: <ul><li><code>text-sm</code> (font size 0.875rem)</li><li><code>text-muted-foreground</code> (text color muted foreground)</li></ul>',
			},
		},
	},
	render: () => <Muted>Muted text</Muted>,
};

export const Sample1: Story = {
	render: () => (
		<div className="space-y-4 max-w-2xl">
			<Muted>By Jane Doe | October 27, 2025</Muted>
			<H1>The Future of Web Development</H1>
			<Lead>
				In this article, we explore the latest trends shaping the web
				development landscape and how they impact modern applications.
			</Lead>
			<P>
				Web development has evolved rapidly over the past decade. From simple
				static HTML pages to complex, interactive single-page applications, the
				field continues to push technological boundaries. Developers today have
				access to powerful tools and frameworks that enable them to create more
				sophisticated user experiences than ever before.
			</P>
			<H2>Key Trends Shaping the Industry</H2>
			<H3>Component-Based Architecture</H3>
			<P>
				Modern frontend frameworks like React, Vue.js, and Angular emphasize
				reusable components. This approach allows developers to break down
				complex user interfaces into smaller, manageable pieces that can be
				developed, tested, and maintained independently.
			</P>
			<Blockquote>
				"Components are the building blocks of modern web applications, enabling
				developers to create scalable and maintainable codebases."
			</Blockquote>
			<P>
				This modular approach not only improves code reusability but also
				enhances team collaboration and reduces development time.
			</P>
			<H3>Server-Side Rendering and Performance</H3>
			<P>
				Server-side rendering (SSR) has gained significant traction as a way to
				improve both performance and search engine optimization. By rendering
				pages on the server before sending them to the client, applications can
				achieve faster initial load times and better SEO rankings.
			</P>
			<H4>Benefits of SSR</H4>
			<P>
				Among the key benefits are improved first contentful paint, better
				accessibility for users with slower connections, and enhanced
				discoverability by search engines. Frameworks like{' '}
				<InlineCode>Next.js</InlineCode> for React and{' '}
				<InlineCode>Nuxt.js</InlineCode> for Vue make implementing SSR
				straightforward.
			</P>
			<Large>Looking Ahead</Large>
			<P>
				As we look to the future, emerging technologies like WebAssembly, edge
				computing, and AI-driven development tools promise to further
				revolutionize how we build web applications. The web development
				community remains excited about these innovations and their potential to
				create even more powerful and accessible digital experiences.
			</P>
		</div>
	),
};
