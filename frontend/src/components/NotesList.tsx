import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NotesList({ files }) {
  const [showNote, setShowNote] = useState(true);
  let text = files[0].text;
  const fileClicked = (e) => {
    setShowNote(!showNote);
    text = e.text;
  };
  return (
    <>
      <div>
        {showNote ? (
          <ul role="list" className="divide-y divide-gray-100 px-3 mt-3">
            {files.map((file) => (
              <li
                onClick={() => setShowNote(!showNote)}
                key={file.id}
                className="flex bg-beige rounded-xl hover:cursor-pointer shadow-lg justify-between mt-1 px-3 py-4"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-ml font-semibold leading-6 text-gray-900">
                      {file.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {file.subject}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Created {file.date_created}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last accessed <span>{file.date_accessed}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-x-4 flex">
            <div>
              <button
                onClick={() => setShowNote(!showNote)}
                className="border border-black hover:shadow-lg rounded-lg w-12 mt-2 ml-2"
              >
                <div>
                  <ChevronLeftIcon className="h-6 w-6" />
                </div>
              </button>
            </div>
            <div className="mt-2">{text}</div>
          </div>
        )}
      </div>
    </>
  );
}
