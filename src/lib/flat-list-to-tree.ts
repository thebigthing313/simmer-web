type TreeNode<T> = T & { children: Array<TreeNode<T>> };

export function flatListToTree<
	T extends { id: string; label: string; parent_id?: string | null },
>(items: Array<T>): Array<TreeNode<T>> {
	const itemMap = new Map<string, TreeNode<T>>();
	const tree: TreeNode<T>[] = [];

	// --- Pass 1: Create map and initialize children ---
	items.forEach((item) => {
		itemMap.set(item.id, { ...item, children: [] });
	});

	// --- Pass 2: Link nodes and build the tree ---
	itemMap.forEach((node) => {
		const parentId = node.parent_id;

		// Try to find the parent (if a parentId exists)
		const parent = parentId ? itemMap.get(parentId) : undefined;

		if (parent) {
			parent.children.push(node);
		} else {
			tree.push(node);
		}
	});

	function sortTree(nodes: TreeNode<T>[]) {
		nodes.sort((a, b) => a.label.localeCompare(b.label));

		nodes.forEach((node) => {
			if (node.children.length > 0) {
				sortTree(node.children);
			}
		});
	}
	sortTree(tree);
	return tree;
}
