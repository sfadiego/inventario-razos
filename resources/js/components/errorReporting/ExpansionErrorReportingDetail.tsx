import { IErrorReporting } from '@/models/errorReporting';

export const ExpansionErrorReportingDetail = ({ record }: { record: IErrorReporting }) => {
  return (
    <div className="grid grid-cols-12 px-8 pt-2">
      <div className="col-span-12">
        <h3 className="mb-1 text-lg font-bold">Request payload</h3>
        <p className="overflow-x-auto rounded bg-gray-100 p-2 font-mono text-sm whitespace-pre-wrap">{JSON.stringify(record.request_payload)}</p>
        <h3 className="mb-1 text-lg font-bold">Response body</h3>
        <p className="overflow-x-auto rounded bg-gray-100 p-2 font-mono text-sm whitespace-pre-wrap">{JSON.stringify(record.response_body)}</p>
      </div>
    </div>
  );
};
