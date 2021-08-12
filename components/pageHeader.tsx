export const PageHeader = ({ children = '', text = '' }) => (
  <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {
            text !== '' && (
            <h1 className="text-3xl font-bold text-gray-900">
              {text}
            </h1>
            )
        }
      {children}
    </div>
  </header>
);
