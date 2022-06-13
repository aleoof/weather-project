import React from 'react';

export default function Spinner({ style }) {
	return (
		<div
			className="spinner-border spinner-border-sm"
			style={style}
			role="status"
		>
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}
