import Image from 'next/image';
import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItem}> = memo(({item}) => {
  const {title, date, location, content, image, time, credencial, url} = item;
  return (
    <a className="flex flex-row pb-8 text-center last:pb-0 md:text-left hover:bg-slate-200 rounded-xl p-2 m-2 border shadow-md" href={url} target="_blank">
      <div>
        {!!image && (
          <div className="col-span-1 flex justify-center md:justify-start p-2">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32 border-2 border-green-500">
              <Image alt="location" layout="fill" objectFit="cover" src={image} />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col pb-8 last:pb-0 text-left ml-8">
        <div className="flex flex-col pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center justify-center gap-x-2 md:justify-start">
            <span className="flex-1 text-sm font-medium italic sm:flex-none">{location}</span>
            <span>•</span>
            <span className="flex-1 text-sm sm:flex-none">{date} <i>{time}</i></span>
          </div>
            {
              credencial !== '' && (
                <div className="flex items-center justify-center gap-x-2 md:justify-start">
                <span className="flex-1 text-sm font-medium sm:flex-none">Id de la credencial: </span>
                  <span className="flex-1 text-sm sm:flex-none">{credencial}</span>
                </div>
              )
            }
        </div>
        {content}
      </div>
    </a>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
