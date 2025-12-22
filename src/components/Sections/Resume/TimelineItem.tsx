import Image from 'next/image';
import {FC, memo} from 'react';

import {TimelineItem as TimelineItemType} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItemType}> = memo(({item}) => {
  const {title, date, location, content, image, time, credencial, url} = item;
  return (
    <a
      className="m-2 flex flex-row rounded-xl border p-2 pb-8 text-center shadow-md last:pb-0 hover:bg-slate-200 md:text-left"
      href={url}
      target="_blank">
      <div>
        {!!image && (
          <div className="col-span-1 flex justify-center p-2 md:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border-2 border-green-500 md:h-32 md:w-32">
              <Image alt="location" layout="fill" objectFit="cover" src={image} />
            </div>
          </div>
        )}
      </div>
      <div className="ml-8 flex flex-col pb-8 text-left last:pb-0">
        <div className="flex flex-col pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center justify-center gap-x-2 md:justify-start">
            <span className="flex-1 text-sm font-medium italic sm:flex-none">{location}</span>
            <span>•</span>
            <span className="flex-1 text-sm sm:flex-none">
              {date} <i>{time}</i>
            </span>
          </div>
          {credencial !== '' && (
            <div className="flex items-center justify-center gap-x-2 md:justify-start">
              <span className="flex-1 text-sm font-medium sm:flex-none">Id de la credencial: </span>
              <span className="flex-1 text-sm sm:flex-none">{credencial}</span>
            </div>
          )}
        </div>
        {content}
      </div>
    </a>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
