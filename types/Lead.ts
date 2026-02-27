import { ImageSourcePropType } from 'react-native';

export interface Lead {
    _id: { $oid: string };
    status: string;
    lead_id: string;
    lead_name: string;
    city: string;
    customer_mobile: string;
    image_url: ImageSourcePropType;
}