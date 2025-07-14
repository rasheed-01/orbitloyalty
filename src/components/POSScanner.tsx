import React, { useState } from 'react';
import { Scan, ArrowLeft, CheckCircle, XCircle, User, Star, DollarSign } from 'lucide-react';

interface POSScannerProps {
  onNavigate: (page: string) => void;
}

const POSScanner: React.FC<POSScannerProps> = ({ onNavigate }) => {
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState('');

  // Mock customer data
  const mockCustomers: { [key: string]: any } = {
    'ABC123DEF456': {
      name: 'John Smith',
      id: 'customer_12345',
      loyaltyPrograms: {
        'Cafe Mocha': { points: 85, pointsPerDollar: 1 }
      }
    },
    'XYZ789GHI012': {
      name: 'Sarah Johnson',
      id: 'customer_67890',
      loyaltyPrograms: {
        'Cafe Mocha': { points: 150, pointsPerDollar: 1 }
      }
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const customer = mockCustomers[scannedCode];
      if (customer) {
        setScanResult({
          success: true,
          customer: customer,
          message: `Customer found: ${customer.name}`
        });
      } else {
        setScanResult({
          success: false,
          message: 'QR code not found. Please check the code and try again.'
        });
      }
      setIsScanning(false);
    }, 1500);
  };

  const handleAddPoints = () => {
    if (!purchaseAmount || !scanResult?.customer) return;

    const amount = parseFloat(purchaseAmount);
    const pointsToAdd = Math.floor(amount * 1); // 1 point per dollar

    setScanResult({
      ...scanResult,
      pointsAdded: pointsToAdd,
      purchaseAmount: amount,
      success: true,
      message: `Successfully added ${pointsToAdd} points to ${scanResult.customer.name}'s account!`
    });

    // Reset form
    setPurchaseAmount('');
    setScannedCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('business-dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">POS Scanner</h1>
                <p className="text-gray-600">Scan customer QR codes to award loyalty points</p>
              </div>
            </div>
            <div className="bg-blue-100 px-4 py-2 rounded-lg">
              <p className="text-blue-800 font-semibold">Cafe Mocha POS</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scanner Interface */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
              <Scan className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan Customer QR Code</h2>
            <p className="text-gray-600">Enter the QR code manually or scan with camera</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer QR Code
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value.toUpperCase())}
                  placeholder="ABC123DEF456"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                />
                <button
                  onClick={handleScan}
                  disabled={!scannedCode || isScanning}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="mr-2 h-5 w-5" />
                      Scan
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Try: ABC123DEF456 or XYZ789GHI012 for demo
              </p>
            </div>

            {/* Scan Result */}
            {scanResult && (
              <div className={`p-6 rounded-xl border-2 ${
                scanResult.success 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center mb-4">
                  {scanResult.success ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 mr-3" />
                  )}
                  <p className={`font-medium ${
                    scanResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {scanResult.message}
                  </p>
                </div>

                {scanResult.success && scanResult.customer && !scanResult.pointsAdded && (
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{scanResult.customer.name}</h3>
                        <p className="text-gray-600">Current points: {scanResult.customer.loyaltyPrograms['Cafe Mocha']?.points || 0}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Purchase Amount ($)
                        </label>
                        <div className="flex space-x-4">
                          <input
                            type="number"
                            step="0.01"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(e.target.value)}
                            placeholder="15.99"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <button
                            onClick={handleAddPoints}
                            disabled={!purchaseAmount}
                            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                          >
                            <Star className="mr-2 h-5 w-5" />
                            Add Points
                          </button>
                        </div>
                        {purchaseAmount && (
                          <p className="text-sm text-gray-600 mt-2">
                            Will add {Math.floor(parseFloat(purchaseAmount) * 1)} points
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {scanResult.pointsAdded && (
                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-center">
                      <div className="bg-green-200 p-3 rounded-full inline-block mb-3">
                        <CheckCircle className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">Transaction Complete!</h3>
                      <div className="space-y-1 text-green-700">
                        <p>Purchase Amount: ${scanResult.purchaseAmount}</p>
                        <p>Points Added: {scanResult.pointsAdded}</p>
                        <p className="font-semibold">New Balance: {(scanResult.customer.loyaltyPrograms['Cafe Mocha']?.points || 0) + scanResult.pointsAdded} points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">How to Use POS Scanner</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
              <p>Ask customer to show their QR code from LoyaltyHub app or Apple Wallet</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
              <p>Scan the QR code or enter it manually</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
              <p>Enter the purchase amount and click "Add Points"</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
              <p>Points are automatically added to customer's account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSScanner;