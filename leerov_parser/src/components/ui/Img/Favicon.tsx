import { useEffect, useState } from 'react';

interface Props {
    domain: string;
    size?: number;
}

function Favicon({ domain, size = 32 }: Props) {
    const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

    useEffect(() => {
        // Проверка на валидный домен
        if (!domain || typeof domain !== 'string' || domain.trim() === '') {
            setFaviconUrl(null);
            return;
        }

        // Создаем URL для запроса favicon
        const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

        // Проверяем, существует ли favicon.  Этот метод не всегда надежен,
        // но это быстрый способ избежать пустых иконок. Лучше использовать
        // серверную логику для более надежной проверки.
        const img = new Image();
        img.src = url;
        img.onload = () => {
            if (img.width > 0 && img.height > 0) { // Проверяем, что изображение загрузилось
                setFaviconUrl(url);
            } else {
                setFaviconUrl(null); // Если изображение не загрузилось, сбрасываем URL
            }
        };
        img.onerror = () => {
            setFaviconUrl(null); // Если произошла ошибка загрузки, сбрасываем URL
        };
    }, [domain, size]);


    if (!faviconUrl) {
        return <span>{domain}</span>;  // Или Placeholder, если иконка не найдена
    }

    return (
        <img
            src={faviconUrl}
            alt={`Favicon for ${domain}`}
            width={size}
            height={size}
            style={{ verticalAlign: 'middle' }} // Для выравнивания иконки по вертикали
        />
    );
}

export default Favicon;

// Пример использования:
// <Favicon domain="google.com" size={64} />
// <Favicon domain="example.com" />
// <Favicon domain={myDomainVariable} />
