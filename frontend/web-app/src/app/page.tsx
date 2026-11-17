import EmptyState from "@/components/EmptyState";
import { AppPagination } from "@/components/ui/app-pagination";
import { getListings } from "@/features/listings/action";
import Filters from "@/features/listings/Filters";
import Listings from "@/features/listings/Listings";
import { Suspense } from "react";

export default function Home(props: PageProps<"/">) {
  return (
    <Suspense fallback={<p role="status">Loading cars...</p>}>
      <ListingsContent searchParams={props.searchParams} />
    </Suspense>
  );
}

async function ListingsContent(props: Pick<PageProps<"/">, "searchParams">) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.pageNumber || 1);
  const pageSize = Number(searchParams.pageSize || 4);
  const searchTerm = String(searchParams.searchTerm || ""); 

  const data = await getListings({
    ...searchParams,
    pageNumber: String(page),
    pageSize: String(pageSize),
    searchTerm
  });

    return (
        <div className='flex flex-col flex-1'>
            {data.totalCount === 0 ? (
                <div className='flex flex-1 justify-center items-center'>
                    <EmptyState/>
                </div>
                
            ) : (
                <>
                    <Filters /> 
                    <Listings auctions={data.results}/>
                    <AppPagination
                        page={Number(searchParams["pageNumber"]) || 1}
                        pageSize={Number(searchParams["pageSize"]) || 8}
                        totalCount={data.totalCount}
                    />
                </>
            )}

        </div>
    );
}
