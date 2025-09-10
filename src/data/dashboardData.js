export const initialDashboardData = {
  categories: [
    {
      id: 'cnapp',
      name: 'CNAPP Dashboard',
      widgets: [
        { id: 'cloud-accounts', type: 'Cloud Accounts', title: 'Cloud Accounts', category: 'cnapp' },
        { id: 'risk-assessment', type: 'Cloud Account Risk Assessment', title: 'Cloud Account Risk Assessment', category: 'cnapp' }
      ]
    },
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'top-alerts', type: 'Top Normative Alerts', title: 'Top 5 Normative Specific Alerts', category: 'cspm' },
        { id: 'workload-alerts', type: 'Workload Alerts', title: 'Workload Alerts', category: 'cspm' }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        { id: 'registry-scan', type: 'Registry Scan', title: 'Image Risk Assessment', category: 'cwpp' },
        { id: 'security-issues', type: 'Image Security Issues', title: 'Image Security Issues', category: 'cwpp' }
      ]
    }
  ]
};

export const availableWidgetTypes = [
  'Cloud Accounts',
  'Cloud Account Risk Assessment',
  'Top Normative Alerts',
  'Workload Alerts',
  'Registry Scan',
  'Image Security Issues'
];