import { eq, isNull, not, useLiveSuspenseQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import {
	createColumnHelper,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UserButton } from '@/components/blocks/user-button';
import { TableRenderer } from '@/components/table-renderer';
import { Badge } from '@/components/ui/badge';
import { group_profiles } from '@/simmerbase/db/collections/group_profiles';
import { profiles } from '@/simmerbase/db/collections/profiles';

export const Route = createFileRoute('/$groupSlug/settings/members')({
	component: () => (
		<ErrorBoundary fallback={<div>Error loading group members.</div>}>
			<Suspense fallback={null}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
	loader: () => {
		return { crumb: 'Members' };
	},
});

type MemberRow = {
	profile_id: string;
	group_profile_id: string;
	first_name: string;
	last_name: string;
	avatar_url: string | null;
	group_role: string;
	is_active: boolean;
};
const columnHelper = createColumnHelper<MemberRow>();
const columns = [
	columnHelper.display({
		id: 'avatar',
		cell: (prop) => (
			<UserButton
				imageUrl={prop.row.original.avatar_url ?? undefined}
				fallback={`${prop.row.original.first_name[0]}${prop.row.original.last_name[0]}`}
			/>
		),
	}),
	columnHelper.accessor('first_name', {
		header: 'First Name',
		cell: (info) => info.getValue(),
		sortingFn: 'alphanumeric',
	}),
	columnHelper.accessor('last_name', {
		header: 'Last Name',
		cell: (info) => info.getValue(),
		sortingFn: 'alphanumeric',
	}),

	columnHelper.accessor('group_role', {
		header: 'Role',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('is_active', {
		header: 'Active',
		cell: (info) =>
			info.getValue() ? (
				<Badge>Active</Badge>
			) : (
				<Badge variant="destructive">Inactive</Badge>
			),
	}),
];

function RouteComponent() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const { data: members } = useLiveSuspenseQuery((q) =>
		q
			.from({ group_profile: group_profiles })
			.innerJoin({ profile: profiles }, ({ group_profile, profile }) =>
				eq(group_profile.profile_id, profile.id),
			)
			.where(({ profile }) => not(isNull(profile.user_id)))
			.select(({ profile, group_profile }) => ({
				profile_id: profile.id,
				group_profile_id: group_profile.id,
				first_name: profile.first_name,
				last_name: profile.last_name,
				avatar_url: profile.avatar_url,
				group_role: group_profile.role,
				is_active: group_profile.is_active,
			})),
	);

	const table = useReactTable({
		data: members,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	return TableRenderer<MemberRow>(table);
}
