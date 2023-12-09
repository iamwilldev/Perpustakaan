import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function PaginationLinks({meta, onPageClick}) {
    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4 w-full">
        <div className="flex flex-1 justify-between sm:hidden">
            <a
            href="#"
            onClick={ev => onClick(ev, meta.links[0])}
            className={
                'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md '
                + (meta.prev ? ' text-gray-700 bg-white hover:bg-gray-50 ' : ' text-gray-300 bg-gray-50 ')
            }
            >
            Previous
            </a>
            <a
            href="#"
            onClick={ev => onClick(ev, meta.links[meta.links.length-1])}
            className={
                'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md '
                + (meta.next ? ' text-gray-700 bg-white hover:bg-gray-50 ' : ' text-gray-300 bg-gray-50 ')
            }
            >
            Next
            </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                <span className="font-medium">{meta.totals}</span> results
            </p>
            </div>
            <div>
                {meta.total > meta.per_page && 
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        
                        {meta.links && meta.links.map((link, ind) => (
                            <a
                                href="#"
                                key={ind}
                                onClick={ev => onClick(ev, link)}
                                aria-current="page"
                                className={
                                    'relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 '
                                    + (ind === 0 ? ' rounded-l-md ' : '')
                                    + (ind === meta.links.length - 1 ? ' rounded-r-md ' : '')
                                    + (link.active ? ' border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-gray-300 text-gray-500')
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </a>
                        ))}
                    </nav>
                }
            </div>
        </div>
        </div>
    )
}
