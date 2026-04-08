import { mergeProps, Show } from 'solid-js';

export function Skeleton(props) {
	const merged = mergeProps({
		width: '100%',
		height: '1rem',
		variant: 'text',
		animated: true,
		count: 1
	}, props);

	const variantClasses = {
		text: 'cn-skeleton-text',
		circular: 'cn-skeleton-circular',
		rectangular: 'cn-skeleton-rectangular'
	};

	const baseClass = () => {
		const classes = ['cn-skeleton', variantClasses[merged.variant] || 'cn-skeleton-text'];
		if (merged.animated) classes.push('cn-skeleton-animated');
		return classes.join(' ');
	};

	const items = () => {
		const arr = [];
		for (let i = 0; i < merged.count; i++) {
			arr.push(i);
		}
		return arr;
	};

	return (
		<>
			{items().map((i) => (
				<div
					class={baseClass()}
					style={`width: ${merged.width}; height: ${merged.height};`}
				/>
			))}
		</>
	);
}
