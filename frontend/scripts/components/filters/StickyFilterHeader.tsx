import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import { IFilter } from '../../types/filter';

interface Props {
    filter: IFilter;
    onChange: (value: string) => void;
}

@PureRender
export default class StickyFilterHeader extends React.Component<Props, void> {

    render() {
        return (
            <div className="sticky-filter-header-container">
                <div className="sticky-filter-header">
                    sticky filter!
                </div>
            </div>
        );

    }

}