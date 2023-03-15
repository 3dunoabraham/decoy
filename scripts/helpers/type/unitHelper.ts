import { DEFAULT_UNIT } from "@/scripts/constants/unit"


export const unit2Form = (unit)=> {
    const {retail_price,min_retail_price, agreement_price, min_agreement_price} = (
        unit.price || DEFAULT_UNIT.price
    )
    let {axles, color, gvwr, hitch_type, shipping_weight} = (
        unit.characteristics || DEFAULT_UNIT.characteristics
    )
    let {mso, title_number, title_state, title_status} = (
        unit.registration_title || DEFAULT_UNIT.registration_title
    )
    let {manufacturer, serial} = (
        unit.gps || DEFAULT_UNIT.gps
    )
    let {previous_investor, current_investor} = (
        unit.investors || DEFAULT_UNIT.investors
    )
    let {location, physical_as_of, location_related} = (
        unit.locations || DEFAULT_UNIT.locations
    )

    return ({
        price: { retail_price, min_retail_price, agreement_price, min_agreement_price},
        characteristics: {axles, color, gvwr, hitch_type, shipping_weight},
        registration_title: {mso, title_number, title_state, title_status},
        gps: {manufacturer, serial},
        investors: {previous_investor, current_investor},
        locations: {location, physical_as_of, location_related},
    })
}