import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';
import { sanitizePostContent } from '@gitroom/helpers/utils/sanitize.post.content';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
import SafeImage from '@gitroom/react/helpers/safe.image';
import Link from 'next/link';
import { CommentsComponents } from '@gitroom/frontend/components/preview/comments.components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { VideoOrImage } from '@gitroom/react/helpers/video.or.image';
import { CopyClient } from '@gitroom/frontend/components/preview/copy.client';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { RenderPreviewDateClient } from '@gitroom/frontend/components/preview/render.preview.date.client';
import { CreationMethodBadge } from '@gitroom/frontend/components/launches/creation.method.badge';

dayjs.extend(utc);
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Postora' : 'Gitroom'} Preview`,
  description: '',
};
export default async function Auth(
  props: {
    params: Promise<{
      id: string;
    }>;
    searchParams?: Promise<{
      share?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    id
  } = params;

  const post = await (await internalFetch(`/public/posts/${id}`)).json();
  const t = await getT();
  if (!post.length) {
    return (
      <div className="text-white fixed start-0 top-0 w-full h-full flex justify-center items-center text-[20px]">
        {t('post_not_found', 'Post not found')}
      </div>
    );
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-[1346px] py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="min-w-[55px]">
                <Link
                  href="/"
                  className="text-2xl flex items-center justify-center gap-[10px] text-textColor order-1"
                >
                  <div className="max-w-[55px]">
                    <SafeImage
                      src={'/postora.svg'}
                      width={55}
                      height={55}
                      alt="Logo"
                    />
                  </div>
                  <div>
                    <svg
                      width="89"
                      height="23"
                      viewBox="0 0 89 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 22.62L0 3.22L3.64 3.22L3.64 5.93L3.3 5.15Q4 4.08 5.21 3.5Q6.42 2.91 7.98 2.91Q10.01 2.91 11.65 3.9Q13.29 4.89 14.25 6.56Q15.21 8.24 15.21 10.32Q15.21 12.38 14.26 14.07Q13.31 15.76 11.67 16.74Q10.04 17.73 7.96 17.73Q6.5 17.73 5.26 17.2Q4.03 16.67 3.28 15.63L3.9 14.82L3.9 22.62ZM7.49 14.22Q8.58 14.22 9.41 13.73Q10.24 13.23 10.71 12.35Q11.18 11.47 11.18 10.32Q11.18 9.18 10.71 8.31Q10.24 7.44 9.41 6.93Q8.58 6.42 7.49 6.42Q6.45 6.42 5.63 6.92Q4.81 7.41 4.36 8.29Q3.9 9.18 3.9 10.32Q3.9 11.47 4.36 12.35Q4.81 13.23 5.63 13.73Q6.45 14.22 7.49 14.22ZM22.98 17.73Q20.88 17.73 19.15 16.77Q17.42 15.81 16.39 14.13Q15.37 12.45 15.37 10.32Q15.37 8.16 16.39 6.5Q17.42 4.84 19.15 3.87Q20.88 2.91 22.98 2.91Q25.09 2.91 26.81 3.87Q28.52 4.84 29.55 6.5Q30.58 8.16 30.58 10.32Q30.58 12.45 29.55 14.13Q28.52 15.81 26.81 16.77Q25.09 17.73 22.98 17.73ZM22.98 14.22Q24.05 14.22 24.84 13.73Q25.64 13.23 26.09 12.35Q26.55 11.47 26.55 10.32Q26.55 9.18 26.09 8.31Q25.64 7.44 24.84 6.93Q24.05 6.42 22.98 6.42Q21.92 6.42 21.11 6.93Q20.31 7.44 19.85 8.31Q19.4 9.18 19.4 10.32Q19.4 11.47 19.85 12.35Q20.31 13.23 21.11 13.73Q21.92 14.22 22.98 14.22ZM36.87 17.73Q34.53 17.73 32.8 16.63Q31.07 15.52 30.45 13.65L33.31 12.3Q33.85 13.44 34.79 14.09Q35.72 14.74 36.87 14.74Q37.7 14.74 38.14 14.4Q38.58 14.07 38.58 13.47Q38.58 13.16 38.43 12.93Q38.27 12.71 37.96 12.53Q37.65 12.35 37.18 12.22L34.76 11.54Q33.02 11.05 32.08 9.94Q31.15 8.84 31.15 7.33Q31.15 6.01 31.82 5.02Q32.5 4.03 33.72 3.47Q34.94 2.91 36.53 2.91Q38.61 2.91 40.18 3.89Q41.76 4.86 42.41 6.63L39.52 7.98Q39.21 7.1 38.39 6.56Q37.57 6.03 36.53 6.03Q35.78 6.03 35.35 6.34Q34.92 6.66 34.92 7.2Q34.92 7.49 35.07 7.72Q35.23 7.96 35.58 8.14Q35.93 8.32 36.45 8.48L38.71 9.15Q40.48 9.67 41.42 10.72Q42.35 11.78 42.35 13.31Q42.35 14.64 41.66 15.63Q40.98 16.61 39.75 17.17Q38.53 17.73 36.87 17.73ZM49.97 17.58Q47.4 17.58 45.98 16.18Q44.56 14.79 44.56 12.3L44.56 6.6L42.17 6.6L42.17 3.22L42.3 3.22Q43.39 3.22 43.98 2.68Q44.56 2.13 44.56 1.04L44.56 0L48.46 0L48.46 3.22L51.79 3.22L51.79 6.6L48.46 6.6L48.46 12.04Q48.46 12.77 48.72 13.25Q48.98 13.73 49.53 13.96Q50.08 14.2 50.88 14.2Q51.06 14.2 51.3 14.17Q51.53 14.14 51.79 14.12L51.79 17.42Q51.4 17.47 50.91 17.52Q50.41 17.58 49.97 17.58ZM59.57 17.73Q57.46 17.73 55.73 16.77Q54 15.81 52.97 14.13Q51.95 12.45 51.95 10.32Q51.95 8.16 52.97 6.5Q54 4.84 55.73 3.87Q57.46 2.91 59.57 2.91Q61.67 2.91 63.39 3.87Q65.1 4.84 66.13 6.5Q67.16 8.16 67.16 10.32Q67.16 12.45 66.13 14.13Q65.1 15.81 63.39 16.77Q61.67 17.73 59.57 17.73ZM59.57 14.22Q60.63 14.22 61.42 13.73Q62.22 13.23 62.67 12.35Q63.13 11.47 63.13 10.32Q63.13 9.18 62.67 8.31Q62.22 7.44 61.42 6.93Q60.63 6.42 59.57 6.42Q58.5 6.42 57.69 6.93Q56.89 7.44 56.43 8.31Q55.98 9.18 55.98 10.32Q55.98 11.47 56.43 12.35Q56.89 13.23 57.69 13.73Q58.5 14.22 59.57 14.22ZM67.89 17.42L67.89 3.22L71.53 3.22L71.53 6.63L71.27 6.14Q71.73 4.34 72.81 3.7Q73.89 3.07 75.37 3.07L76.21 3.07L76.21 6.45L74.98 6.45Q73.55 6.45 72.67 7.32Q71.79 8.19 71.79 9.78L71.79 17.42ZM80.76 17.73Q79.22 17.73 78.1 17.24Q76.99 16.74 76.39 15.82Q75.79 14.9 75.79 13.62Q75.79 12.43 76.34 11.5Q76.88 10.58 78.01 9.96Q79.14 9.33 80.83 9.07L85.18 8.37L85.18 11.23L81.54 11.88Q80.7 12.04 80.26 12.41Q79.82 12.79 79.82 13.49Q79.82 14.14 80.31 14.51Q80.81 14.87 81.54 14.87Q82.5 14.87 83.23 14.46Q83.95 14.04 84.36 13.32Q84.76 12.61 84.76 11.75L84.76 8.06Q84.76 7.25 84.12 6.71Q83.49 6.16 82.39 6.16Q81.35 6.16 80.56 6.73Q79.77 7.31 79.4 8.24L76.28 6.76Q76.7 5.56 77.61 4.71Q78.52 3.85 79.79 3.38Q81.07 2.91 82.58 2.91Q84.37 2.91 85.75 3.56Q87.13 4.21 87.89 5.37Q88.66 6.53 88.66 8.06L88.66 17.42L85.02 17.42L85.02 15.13L85.9 14.98Q85.28 15.91 84.53 16.52Q83.77 17.13 82.84 17.43Q81.9 17.73 80.76 17.73Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-[20px]">
            {!!searchParams?.share && (
              <div>
                <CopyClient />
              </div>
            )}
            <div className="flex-1">
              {t('publication_date', 'Publication Date:')}{' '}
              <RenderPreviewDateClient date={post[0].publishDate} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row text-white w-full max-w-[1346px] mx-auto">
        <div className="flex-1">
          <div className="gap-[20px] flex flex-col">
            {post.map((p: any, index: number) => (
              <div
                key={String(p.id)}
                className="relative px-4 py-4 bg-third border border-tableBorder"
              >
                <div className="flex space-x-3">
                  <div>
                    <div className="flex shrink-0 rounded-full h-30 w-30 relative">
                      <div className="w-[50px] h-[50px] z-[20]">
                        <img
                          className="w-full h-full relative z-[20] bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.name}
                          src={post[0].integration.picture}
                        />
                      </div>
                      <div className="absolute -end-[5px] -bottom-[5px] w-[30px] h-[30px] z-[20]">
                        <img
                          className="w-full h-full bg-black aspect-square rounded-full border-tableBorder"
                          alt={post[0].integration.providerIdentifier}
                          src={`/icons/platforms/${post[0].integration.providerIdentifier}.png`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-semibold">
                        {post[0].integration.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        @{post[0].integration.profile}
                      </span>
                      {index === 0 && (
                        <CreationMethodBadge
                          creationMethod={p.creationMethod}
                          size="md"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <div
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: sanitizePostContent(p.content),
                        }}
                      />
                      <div className="flex w-full gap-[10px]">
                        {JSON.parse(p?.image || '[]').map((p: any) => (
                          <div
                            key={p.name}
                            className="flex-1 rounded-[10px] max-h-[500px] overflow-hidden"
                          >
                            <VideoOrImage
                              isContain={true}
                              src={p.path}
                              autoplay={true}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="p-4 pt-0">
            <CommentsComponents postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
