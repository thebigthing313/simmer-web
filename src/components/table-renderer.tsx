import { flexRender, type Table as ReactTable } from '@tanstack/react-table';
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

export function TableRenderer<T>(table: ReactTable<T>) {
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder ? null : (
									<div
										className={cn(
											'flex items-center',
											header.column.getCanSort()
												? 'cursor-pointer select-none'
												: '',
										)}
									>
										<span>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</span>
										{header.column.getCanSort() && (
											<Button
												variant="link"
												size="icon-sm"
												onClick={header.column.getToggleSortingHandler()}
											>
												{header.column.getIsSorted() === 'asc' && (
													<ChevronsUp />
												)}
												{header.column.getIsSorted() === 'desc' && (
													<ChevronsDown />
												)}
												{header.column.getIsSorted() === false && (
													<ChevronsUpDown />
												)}
											</Button>
										)}
									</div>
								)}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.map((row) => (
					<TableRow key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
