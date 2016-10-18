import * as React from "react";
import * as PureRender from "pure-render-decorator";
import { map } from "lodash";

import { IWine } from "../../types/wine";
import { BaseWineList } from "../base/BaseWineComponents";
import AdminWineItem from "./AdminWineItem";

interface Props {
    selectedWineId: number;
    filteredWines: IWine[];
    selectWine: (wine: IWine) => void;
}

@PureRender
export default class AdminWineList extends React.Component<Props, void> {

    private getWineIds(): number[] {
        return map(this.props.filteredWines, wine => wine.id);
    }

    private renderWineItems(): React.ReactElement<any>[] {
        return map(this.props.filteredWines, wine =>
            <AdminWineItem
                key={wine.id}
                wine={wine}
                selected={wine.id === this.props.selectedWineId}
                selectWine={this.props.selectWine}
            />
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
