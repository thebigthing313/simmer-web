import { eq, isNull, useLiveSuspenseQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';
import { useState } from 'react';
import { UserButton } from '@/components/blocks/user-button';
import { TableRenderer } from '@/components/table-renderer';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { group_profiles } from '@/simmerbase/db/collections/group_profiles';
import { profiles } from '@/simmerbase/db/collections/profiles';

export const Route = createFileRoute('/$groupSlug/settings/profiles')({
	component: RouteComponent,
});

type DummyProfile = {
	profile_id: string;
	group_profile_id: string;
	first_name: string;
	last_name: string;
	avatar_url: string | null;
};

const columnHelper = createColumnHelper<DummyProfile>();

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
];

function RouteComponent() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	const { data: dummy_profiles } = useLiveSuspenseQuery((q) =>
		q
			.from({ group_profile: group_profiles })
			.innerJoin({ profile: profiles }, ({ group_profile, profile }) =>
				eq(group_profile.profile_id, profile.id),
			)
			.where(({ profile }) => isNull(profile.user_id))
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
		data: dummy_profiles,
		columns,
		rowCount: dummy_profiles.length,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		state: {
			sorting,
			pagination,
		},
		manualPagination: false,
	});
	return (
		<div className="flex flex-col gap-2">
			<div>
				These profiles are not attached to real SIMMER accounts. You should only
				create profiles if you need to upload historical data for your group and
				would like to preserve the names of the people who created the data.
			</div>
			{TableRenderer<DummyProfile>(table)}
			<ButtonGroup>
				<Button
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronsLeft />
				</Button>
				<Button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeft />
				</Button>
				<ButtonGroupText>
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount().toLocaleString()}
						</strong>
					</span>
				</ButtonGroupText>
				<Button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronRight />
				</Button>
				<Button
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronsRight />
				</Button>
				<ButtonGroupText> Rows per page: </ButtonGroupText>
				<Select
					value={table.getState().pagination.pageSize.toString()}
					onValueChange={(value) => table.setPageSize(Number(value))}
				>
					<SelectTrigger>
						<SelectValue>
							{table.getState().pagination.pageSize.toString()}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'10'}>10</SelectItem>
						<SelectItem value={'20'}>20</SelectItem>
						<SelectItem value={'30'}>30</SelectItem>
						<SelectItem value={'40'}>40</SelectItem>
						<SelectItem value={'50'}>50</SelectItem>
					</SelectContent>
				</Select>
			</ButtonGroup>
		</div>
	);
}
