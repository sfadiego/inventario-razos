import { Car, CarFront } from 'lucide-react';
import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        // <CarFront {...props} />
        <Car {...props} />
    );
}
