import { map, last, difference, chain } from 'lodash';
import * as _ from 'lodash';

import { RegionType } from '../types/region';


const NOT_APPLICABLE = "n/a";

/**
 * Returns true if the attribute has value and should be
 * shown to the user
 */
export const isApplicable = function(attr: string): boolean {
    return !!attr && attr.length > 0 && attr.toLowerCase() !== NOT_APPLICABLE;
}


const VARIETAL_SPLIT_REG: RegExp = /,|with|and|balance|is|\/|\&/ig;
const NUMBER_REG: RegExp = /[0-9]+/g;

const BLENDS = [
    {
        name: 'Bordeaux Blend',
        varietals: ['merlot', 'cabernet sauvignon', 'petite verdot', 'cabernet franc']
    }
];

/**
 * If a single varietal, returns the varietal
 * If multiple varietal, tries to find a suitable blend
 * Else, returns a | delimited list of varietals with percentages removed.
 */
export const parseVarietal = function(varietal: string): string {
    varietal = varietal.trim();
    let varietals = chain(varietal.split(VARIETAL_SPLIT_REG))
                    .map((v) => v.trim())
                    .filter((v) => v.length > 0 && v.match(NUMBER_REG) === null)
                    .value();
    if (varietals.length === 1) {
        if (varietal.indexOf('aka') > - 1) {
            return last(varietal.split('aka'));
        } else {
            return varietal;
        }
    } else {
        for (const blend of BLENDS) {
            if (difference(map(varietals, (v) => v.toLowerCase()), blend.varietals).length === 0) {
                return blend.name;
            }
        }
    }
    return varietals.join(' | ');
}

export const getRegionType = function(regionType: RegionType): string {
    switch (regionType) {
        case RegionType.COUNTRY:
            return 'country';
        case RegionType.REGION:
            return 'region';
        case RegionType.SUBREGION:
            return 'subregion';
        default:
            return "";
    }
}
