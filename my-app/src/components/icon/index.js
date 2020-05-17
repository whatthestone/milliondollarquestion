import React from 'react';

import Share from './share';
import Copy from './copy';
import CheckAll from './checkall';

const Icon = (props) => {
	switch (props.name) {
		case 'share':
			return <Share {...props} />;
		case 'checkall':
			return <CheckAll {...props} />;
		case 'copy':
			return <Copy {...props} />;
		default:
			return;
	}
};

export default Icon;
