import OrdersGrid from "@/components/OrdersGrid"

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your application
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-lg border border-gray-400 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <p className="mt-2 text-2xl font-semibold">
            8,421
          </p>

          <p className="mt-2 text-xs text-gray-500">
            +8.2% from last month
          </p>
        </div>

        <div className="rounded-lg border border-gray-400 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-2xl font-semibold">
            1,248
          </p>

          <p className="mt-2 text-xs text-gray-500">
            +12.4% from last month
          </p>
        </div>

        <div className="rounded-lg border border-gray-400 bg-white p-5">
          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <p className="mt-2 text-2xl font-semibold">
            ₹24.5 L
          </p>

          <p className="mt-2 text-xs text-gray-500">
            +6.8% from last month
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <div className="rounded-lg border border-gray-400 bg-white p-5 lg:col-span-2">
          <h2 className="text-md font-medium mb-5">
            All Orders
          </h2>
          <OrdersGrid />
        </div>

        <div className="rounded-lg border border-gray-400 bg-white p-5">
          <h2 className="text-md font-medium">
            Recent Orders
          </h2>

          <div className="mt-5 space-y-4">

            <hr className="border border-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  #1001
                </p>

                <p className="text-xs text-gray-500">
                  ABC Ltd
                </p>
              </div>

              <span className="text-sm">
                ₹25,000
              </span>
            </div>

            <hr className="border border-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  #1002
                </p>

                <p className="text-xs text-gray-500">
                  XYZ Ltd
                </p>
              </div>

              <span className="text-sm">
                ₹18,500
              </span>
            </div>

            <hr className="border border-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  #1003
                </p>

                <p className="text-xs text-gray-500">
                  PQR Ltd
                </p>
              </div>

              <span className="text-sm">
                ₹42,000
              </span>
            </div>

            <hr className="border border-gray-100" />


          </div>
        </div>

      </div>
    </div>
  );
}