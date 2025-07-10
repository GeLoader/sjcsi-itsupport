import React, { useState } from 'react';
import { 
  HelpCircle, 
  Monitor, 
  Wifi, 
  Printer, 
  Volume2, 
  Mouse, 
  Keyboard, 
  Camera, 
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface TroubleshootingGuide {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<any>;
  estimatedTime: string;
  description: string;
  symptoms: string[];
  steps: {
    step: number;
    title: string;
    description: string;
    warning?: string;
    tip?: string;
  }[];
  videoUrl?: string;
  relatedGuides?: string[];
}

const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: 'computer-wont-start',
    title: 'Computer Won\'t Start',
    category: 'Hardware',
    icon: Monitor,
    estimatedTime: '5-10 minutes',
    description: 'Step-by-step guide to diagnose and fix a computer that won\'t turn on.',
    symptoms: [
      'No power lights or sounds when pressing power button',
      'Computer starts but screen remains black',
      'Fans spin but no display output'
    ],
    steps: [
      {
        step: 1,
        title: 'Check Power Connections',
        description: 'Ensure the power cable is securely connected to both the computer and wall outlet.',
        tip: 'Try a different power outlet to rule out electrical issues.'
      },
      {
        step: 2,
        title: 'Check Power Supply Switch',
        description: 'Look for a power supply switch on the back of the computer and make sure it\'s in the ON position.',
        warning: 'Make sure the computer is unplugged before checking the power supply switch.'
      },
      {
        step: 3,
        title: 'Test with Different Power Cable',
        description: 'If available, try using a different power cable to eliminate cable issues.'
      },
      {
        step: 4,
        title: 'Check Internal Connections',
        description: 'Open the case and ensure all internal power cables are securely connected.',
        warning: 'Only attempt this if you\'re comfortable working inside a computer case.'
      },
      {
        step: 5,
        title: 'Contact IT Support',
        description: 'If none of the above steps work, create a support ticket for further assistance.'
      }
    ],
    videoUrl: 'https://example.com/computer-wont-start-video',
    relatedGuides: ['monitor-no-display', 'computer-slow-performance']
  },
  {
    id: 'no-internet-connection',
    title: 'No Internet Connection',
    category: 'Network',
    icon: Wifi,
    estimatedTime: '3-7 minutes',
    description: 'Troubleshoot and resolve internet connectivity issues.',
    symptoms: [
      'No internet access despite being connected to WiFi',
      'Cannot access websites or online services',
      'WiFi shows connected but pages won\'t load'
    ],
    steps: [
      {
        step: 1,
        title: 'Check WiFi Connection',
        description: 'Verify that you\'re connected to the correct WiFi network and the signal is strong.'
      },
      {
        step: 2,
        title: 'Restart Your Device',
        description: 'Close all applications and restart your computer or device.',
        tip: 'A simple restart can resolve many temporary network issues.'
      },
      {
        step: 3,
        title: 'Forget and Reconnect to WiFi',
        description: 'Remove the WiFi network from your saved networks and reconnect with the password.'
      },
      {
        step: 4,
        title: 'Check Network Settings',
        description: 'Ensure your network settings are configured to obtain IP address automatically.'
      },
      {
        step: 5,
        title: 'Test with Different Device',
        description: 'Try connecting another device to the same network to determine if the issue is device-specific.'
      },
      {
        step: 6,
        title: 'Contact Network Administrator',
        description: 'If other devices also can\'t connect, contact IT support for network infrastructure issues.'
      }
    ],
    relatedGuides: ['wifi-slow-speed', 'vpn-connection-issues']
  },
  {
    id: 'printer-not-working',
    title: 'Printer Not Working',
    category: 'Peripherals',
    icon: Printer,
    estimatedTime: '5-15 minutes',
    description: 'Resolve common printer issues and get your printer working again.',
    symptoms: [
      'Printer not responding to print commands',
      'Print jobs stuck in queue',
      'Poor print quality or blank pages'
    ],
    steps: [
      {
        step: 1,
        title: 'Check Printer Power and Connections',
        description: 'Ensure the printer is powered on and all cables are securely connected.'
      },
      {
        step: 2,
        title: 'Check Paper and Ink/Toner',
        description: 'Verify there\'s paper in the tray and ink/toner cartridges aren\'t empty.',
        tip: 'Check for any paper jams in the printer mechanism.'
      },
      {
        step: 3,
        title: 'Clear Print Queue',
        description: 'Cancel all pending print jobs and try printing a test page.'
      },
      {
        step: 4,
        title: 'Restart Print Spooler Service',
        description: 'On Windows, restart the Print Spooler service through Services management.'
      },
      {
        step: 5,
        title: 'Update or Reinstall Printer Drivers',
        description: 'Download and install the latest drivers from the printer manufacturer\'s website.'
      },
      {
        step: 6,
        title: 'Run Printer Troubleshooter',
        description: 'Use your operating system\'s built-in printer troubleshooter tool.'
      }
    ],
    relatedGuides: ['scanner-not-working', 'network-printer-setup']
  },
  {
    id: 'no-sound-audio',
    title: 'No Sound or Audio Issues',
    category: 'Audio',
    icon: Volume2,
    estimatedTime: '3-8 minutes',
    description: 'Fix audio problems and restore sound to your computer.',
    symptoms: [
      'No sound from speakers or headphones',
      'Audio is distorted or crackling',
      'Microphone not working'
    ],
    steps: [
      {
        step: 1,
        title: 'Check Volume Settings',
        description: 'Ensure the volume is turned up and not muted in both system settings and application.'
      },
      {
        step: 2,
        title: 'Check Audio Device Connections',
        description: 'Verify speakers or headphones are properly connected to the correct audio port.'
      },
      {
        step: 3,
        title: 'Test Different Audio Output',
        description: 'Try different speakers or headphones to isolate if the issue is with the device.'
      },
      {
        step: 4,
        title: 'Update Audio Drivers',
        description: 'Check Device Manager and update audio drivers if needed.'
      },
      {
        step: 5,
        title: 'Run Audio Troubleshooter',
        description: 'Use the built-in audio troubleshooter in your operating system settings.'
      },
      {
        step: 6,
        title: 'Check Default Audio Device',
        description: 'Ensure the correct audio device is set as the default in sound settings.'
      }
    ],
    relatedGuides: ['microphone-not-working', 'bluetooth-audio-issues']
  },
  {
    id: 'mouse-not-working',
    title: 'Mouse Not Working',
    category: 'Peripherals',
    icon: Mouse,
    estimatedTime: '2-5 minutes',
    description: 'Troubleshoot mouse connectivity and functionality issues.',
    symptoms: [
      'Mouse cursor not moving',
      'Mouse clicks not registering',
      'Erratic mouse movement'
    ],
    steps: [
      {
        step: 1,
        title: 'Check Mouse Connection',
        description: 'Ensure USB mouse is properly connected or wireless mouse is paired.'
      },
      {
        step: 2,
        title: 'Check Battery (Wireless Mouse)',
        description: 'Replace batteries in wireless mouse if applicable.'
      },
      {
        step: 3,
        title: 'Clean Mouse Sensor',
        description: 'Clean the optical sensor on the bottom of the mouse with a soft cloth.'
      },
      {
        step: 4,
        title: 'Try Different USB Port',
        description: 'Connect the mouse to a different USB port to rule out port issues.'
      },
      {
        step: 5,
        title: 'Test on Different Surface',
        description: 'Try using the mouse on a different surface or mouse pad.'
      },
      {
        step: 6,
        title: 'Update Mouse Drivers',
        description: 'Check Device Manager and update mouse drivers if necessary.'
      }
    ],
    relatedGuides: ['keyboard-not-working', 'touchpad-issues']
  },
  {
    id: 'keyboard-not-working',
    title: 'Keyboard Not Working',
    category: 'Peripherals',
    icon: Keyboard,
    estimatedTime: '3-7 minutes',
    description: 'Fix keyboard connectivity and typing issues.',
    symptoms: [
      'Keys not responding when pressed',
      'Some keys typing wrong characters',
      'Keyboard not detected by computer'
    ],
    steps: [
      {
        step: 1,
        title: 'Check Keyboard Connection',
        description: 'Ensure keyboard is properly connected via USB or wireless connection is active.'
      },
      {
        step: 2,
        title: 'Check Num Lock and Caps Lock',
        description: 'Verify that Num Lock and Caps Lock are in the correct state for your needs.'
      },
      {
        step: 3,
        title: 'Clean Keyboard',
        description: 'Remove debris from under keys and clean the keyboard surface.',
        tip: 'Use compressed air to blow out dust and debris from between keys.'
      },
      {
        step: 4,
        title: 'Try Different USB Port',
        description: 'Connect keyboard to a different USB port to test connectivity.'
      },
      {
        step: 5,
        title: 'Check Language Settings',
        description: 'Verify that the correct keyboard language layout is selected in system settings.'
      },
      {
        step: 6,
        title: 'Update Keyboard Drivers',
        description: 'Update keyboard drivers through Device Manager if needed.'
      }
    ],
    relatedGuides: ['mouse-not-working', 'special-keys-not-working']
  }
];

const categories = ['All', 'Hardware', 'Network', 'Peripherals', 'Audio', 'Software'];

export default function Troubleshooting() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<TroubleshootingGuide | null>(null);

  const filteredGuides = troubleshootingGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStepIcon = (stepNumber: number, totalSteps: number) => {
    return (
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
        {stepNumber}
      </div>
    );
  };

  if (selectedGuide) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedGuide(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Troubleshooting Guides
        </button>

        {/* Guide Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <selectedGuide.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedGuide.title}</h1>
              <p className="text-gray-600 mb-4">{selectedGuide.description}</p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Info className="w-4 h-4" />
                  Category: {selectedGuide.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  ⏱️ {selectedGuide.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Common Symptoms
          </h2>
          <ul className="space-y-2">
            {selectedGuide.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Video Tutorial */}
        {selectedGuide.videoUrl && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600" />
              Video Tutorial
            </h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Video tutorial available</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Watch Tutorial
              </button>
            </div>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Step-by-Step Instructions
          </h2>
          <div className="space-y-6">
            {selectedGuide.steps.map((step, index) => (
              <div key={step.step} className="flex gap-4">
                {getStepIcon(step.step, selectedGuide.steps.length)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-3">{step.description}</p>
                  {step.warning && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">Warning</p>
                          <p className="text-red-700 text-sm">{step.warning}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {step.tip && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Tip</p>
                          <p className="text-blue-700 text-sm">{step.tip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Guides */}
        {selectedGuide.relatedGuides && selectedGuide.relatedGuides.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGuide.relatedGuides.map((relatedId) => {
                const relatedGuide = troubleshootingGuides.find(g => g.id === relatedId);
                if (!relatedGuide) return null;
                return (
                  <button
                    key={relatedId}
                    onClick={() => setSelectedGuide(relatedGuide)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <relatedGuide.icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{relatedGuide.title}</p>
                        <p className="text-sm text-gray-600">{relatedGuide.category}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Troubleshooting Guides</h1>
        <p className="text-gray-600">Step-by-step solutions for common IT problems</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search troubleshooting guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Guides</p>
              <p className="text-3xl font-bold text-gray-900">{troubleshootingGuides.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-purple-600">{categories.length - 1}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Videos</p>
              <p className="text-3xl font-bold text-orange-600">
                {troubleshootingGuides.filter(g => g.videoUrl).length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Play className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Time</p>
              <p className="text-3xl font-bold text-blue-600">
                5-10 min
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div key={guide.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">⏱️ {guide.estimatedTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{guide.category}</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Guide
                  </button>
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-2"
                  >
                    Quick Preview
                    {expandedGuide === guide.id ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>
              
              {expandedGuide === guide.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Common Symptoms:</h4>
                  <ul className="space-y-1 mb-4">
                    {guide.symptoms.slice(0, 3).map((symptom, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>{guide.steps.length} steps</strong> to resolve this issue
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No troubleshooting guides found matching your criteria</p>
        </div>
      )}
    </div>
  );
}