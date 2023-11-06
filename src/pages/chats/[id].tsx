import Layout from '../../../components/layout';
import Message from '../../../components/message';

export default function ChatDetail() {
  return (
    <Layout canGoBack>
      <div className="py-16 px-4 space-y-4">
        <Message message="Hi how much are you selling them for?" />
        <Message message="I want ￦20,000" reversed />
        <Message message="미쳤어?" />

        <form className="fixed w-full mx-auto max-w-md bottom-2 left-0 inset-x-0">
          <div className="flex relative items-center">
            <input
              type="text"
              className="shadow-sm w-full rounded-full border-gray-300 focus:ring-orange-500 focus:border-orange-500 focus:outline-none pr-12"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
