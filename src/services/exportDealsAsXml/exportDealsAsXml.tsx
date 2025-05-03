import { DealTableProps } from '@/interfaces/deals';
import { js2xml } from 'xml-js';

export function exportDealsAsXml(deals: DealTableProps[]) {
    const handleClick = () => {
        const xmlData = js2xml(deals, { compact: true, spaces: 2 });

        const xmlBlob = new Blob([xmlData], { type: 'text/xml' });
        const xmlUrl = URL.createObjectURL(xmlBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = xmlUrl;
        downloadLink.download = 'deals.xml';
        downloadLink.click();

        URL.revokeObjectURL(xmlUrl);
    };

    return handleClick;
}