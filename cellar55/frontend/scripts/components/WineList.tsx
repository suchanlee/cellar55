import * as React from "react";
import * as PureRender from "pure-render-decorator";
import { map } from "lodash";

import { IWine } from "../types/wine";
import { BaseWineList } from "./base/BaseWineComponents";
import WineItem from "./WineItem";

interface Props {
    filteredWines: IWine[];
}

@PureRender
export default class WineList extends React.Component<Props, void> {

    private getWineIds(): number[] {
        return map(this.props.filteredWines, wine => wine.id);
    }

    private renderWineItems(): React.ReactElement<any>[] {
        return map(this.props.filteredWines, wine =>
            <WineItem key={wine.id} wine={wine} />
        );
    }

    render() {
        return (
            <BaseWineList
                wineIds={this.getWineIds()}
                wineItems={this.renderWineItems()}
            />
        );
    }
}
