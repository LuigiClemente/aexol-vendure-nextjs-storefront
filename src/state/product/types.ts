import { ProductDetailType } from '@/src/graphql/selectors';
import { LanguageCode } from '@/src/zeus';

export type Variant = ProductDetailType['variants'][number];

export type ExtendedProduct = ProductDetailType & {
    currentColor?: {
        name: string;
        code: string;
    };
    otherColors?: {
        handle: string;
        name: string;
        id: string;
        translations: {
            name: string;
            id: string;
            languageCode: LanguageCode;
        }[];
    }[];
};

export type ProductContainerType = {
    product?: ExtendedProduct;
    variant?: Variant;
    addingError?: string;
    handleVariant: (variant?: Variant) => void;
    handleAddToCart: () => void;
    handleBuyNow: () => void;
    handleOptionClick: (groupId: string, id: string) => void;
    productOptionsGroups: ProductOptionsGroup[];
};

export type OptionGroup = ProductDetailType['optionGroups'][0]['options'];
export type OptionGroupWithStock = OptionGroup[number] & { stockLevel: number; isSelected: boolean };
export type ProductOptionsGroup = OptionGroup[number] & {
    options: OptionGroupWithStock[];
};
