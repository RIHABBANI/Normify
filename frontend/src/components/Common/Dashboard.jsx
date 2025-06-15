import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { 
  Square3Stack3DIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import { getDashboardStats, getPerformanceMetrics } from '../../api/Dashboard/dashboard-api.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const [dateFilters, setDateFilters] = useState({
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [activeFilter, setActiveFilter] = useState('year'); // Track active predefined filter

  const fetchDashboardData = async (startDate = null, endDate = null) => {
    try {
      setLoading(true);
      const [statsData, performanceData] = await Promise.all([
        getDashboardStats(startDate, endDate),
        getPerformanceMetrics(startDate, endDate)
      ]);
      setStats(statsData);
      setPerformance(performanceData);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Impossible de charger les données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(dateFilters.startDate, dateFilters.endDate);
  }, []);
  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const applyDateFilters = () => {
    setActiveFilter('custom');
    fetchDashboardData(dateFilters.startDate, dateFilters.endDate);
  };
  // Predefined date filters
  const applyPredefinedFilter = (period) => {
    const now = new Date();
    let startDate, endDate = now.toISOString().split('T')[0];
    
    switch (period) {
      case 'today':
        startDate = now.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        startDate = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        break;
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        startDate = lastMonth.toISOString().split('T')[0];
        endDate = lastMonthEnd.toISOString().split('T')[0];
        break;
      case 'quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        startDate = quarterStart.toISOString().split('T')[0];
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
        break;
      case 'lastYear':
        const lastYear = now.getFullYear() - 1;
        startDate = new Date(lastYear, 0, 1).toISOString().split('T')[0];
        endDate = new Date(lastYear, 11, 31).toISOString().split('T')[0];
        break;
      default:
        return;
    }
      setDateFilters({ startDate, endDate });
    setActiveFilter(period);
    fetchDashboardData(startDate, endDate);
  };

  // Standardized status configuration for consistency across charts
  const STATUS_CONFIG = {
    order: ['fonctionnel', 'en panne', 'en maintenance', 'hors service'],
    colors: ["#22C55E", "#EF4444", "#F59E0B", "#6B7280"],
    labels: {
      'fonctionnel': 'Fonctionnel',
      'en panne': 'En panne', 
      'en maintenance': 'En maintenance',
      'hors service': 'Hors service'
    }
  };

  // Chart configurations
  const getReplacementTrendChart = () => {
    if (!stats?.monthly_replacements || stats.monthly_replacements.length === 0) return null;

    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const data = stats.monthly_replacements.map(item => item.count);
    const categories = stats.monthly_replacements.map(item => monthNames[item.month - 1] + ' ' + item.year);

    return {
      type: "line",
      height: 240,
      series: [{
        name: "Remplacements",
        data: data
      }],
      options: {
        chart: { toolbar: { show: false } },
        stroke: { curve: 'smooth', width: 3 },
        colors: ["#3B82F6"],
        xaxis: { categories },
        yaxis: { 
          labels: { 
            style: { colors: "#616161", fontSize: "12px" }
          }
        },
        grid: { 
          show: true, 
          borderColor: "#E5E7EB", 
          strokeDashArray: 3 
        },
        tooltip: { theme: "light" }
      }
    };
  };

  const getReplacementByRameChart = () => {
    if (!stats?.replacements_by_rame) return null;

    // Group replacements by rame
    const rameGroups = {};
    stats.replacements_by_rame.forEach(item => {
      if (!rameGroups[item.NUMERO_RAME]) {
        rameGroups[item.NUMERO_RAME] = {
          name: `Rame ${item.NUMERO_RAME}`,
          data: []
        };
      }
      rameGroups[item.NUMERO_RAME].data.push({
        x: `${item.month}/${item.year}`,
        y: item.count
      });
    });

    const series = Object.values(rameGroups);
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

    return {
      type: "bar",
      height: 300,
      series: series,
      options: {
        chart: { 
          toolbar: { show: false },
          type: 'bar'
        },
        colors: colors.slice(0, series.length),
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: [...new Set(stats.replacements_by_rame.map(item => `${item.month}/${item.year}`))].sort(),
          labels: {
            style: { colors: "#616161", fontSize: "12px" }
          }
        },
        yaxis: {
          title: {
            text: 'Nombre de Remplacements'
          },
          labels: {
            style: { colors: "#616161", fontSize: "12px" }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: function (val) {
              return val + " remplacements"
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }      }
    };
  };
  const getStatusDistributionByRameChart = () => {
    if (!stats?.carte_status_by_rame) return null;

    // Group by rame and status
    const rameData = {};
    stats.carte_status_by_rame.forEach(item => {
      if (!rameData[item.NUMERO_RAME]) {
        rameData[item.NUMERO_RAME] = {};
      }
      rameData[item.NUMERO_RAME][item.STATU_CARTE] = item.count;
    });

    const rameNumbers = Object.keys(rameData).sort();
    
    // Use standardized status configuration
    const series = STATUS_CONFIG.order.map(status => ({
      name: STATUS_CONFIG.labels[status],
      data: rameNumbers.map(rame => rameData[rame][status] || 0)
    }));

    return {
      type: "bar",
      height: 300,
      series: series,
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: { show: false }
        },
        colors: STATUS_CONFIG.colors,
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%'
          }
        },
        xaxis: {
          categories: rameNumbers.map(num => `Rame ${num}`),
          labels: {
            style: { colors: "#616161", fontSize: "12px" }
          }
        },
        yaxis: {
          title: {
            text: 'Nombre de Cartes'
          },
          labels: {
            style: { colors: "#616161", fontSize: "12px" }
          }
        },        legend: {
          position: 'top',
          horizontalAlign: 'center'
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: function (val) {
              return val + " cartes"
            }
          }
        }
      }
    };
  };  const getStatusDistributionChart = () => {
    if (!stats?.carte_status_distribution) return null;

    const statusData = stats.carte_status_distribution;
    
    // Use standardized status configuration and always show all statuses (even with 0 count)
    const orderedData = STATUS_CONFIG.order.map(status => ({
      status: status,
      label: STATUS_CONFIG.labels[status],
      count: statusData[status]?.count || 0
    })); // Remove filter to always show all statuses

    const series = orderedData.map(item => item.count);
    const labels = orderedData.map(item => item.label);
    const colors = STATUS_CONFIG.colors; // Use colors in order

    return {
      type: "donut",
      height: 280,
      series: series,
      options: {
        chart: { type: 'donut' },
        labels: labels,
        colors: colors,
        legend: { 
          position: 'bottom',
          horizontalAlign: 'center',
          floating: false,
          fontSize: '14px',
          offsetY: 0
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total',
                  formatter: () => stats.overview.total_cartes
                }
              }
            }
          }
        },
        tooltip: { theme: "light" }
      }
    };
  };

  const getReplacementsByCauseChart = () => {
    if (!stats?.replacements_by_cause) return null;

    const causeData = stats.replacements_by_cause;
    const series = causeData.map(item => item.count);
    const labels = causeData.map(item => item.CAUSE_REMPLACEMENT || 'Non spécifiée');

    // Generate a color palette for the causes
    const colors = [
      "#EF4444", // Red
      "#F59E0B", // Orange
      "#10B981", // Green  
      "#3B82F6", // Blue
      "#8B5CF6", // Purple
      "#EC4899", // Pink
      "#06B6D4", // Cyan
      "#84CC16", // Lime
      "#F97316", // Orange-600
      "#6366F1", // Indigo
      "#14B8A6"  // Teal
    ];

    return {
      type: "bar",
      height: 400,
      series: [{
        name: "Remplacements",
        data: series
      }],
      options: {
        chart: { 
          toolbar: { show: false },
          type: 'bar'
        },
        colors: colors.slice(0, series.length),
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff'],
            fontSize: '12px',
            fontWeight: 'bold'
          }
        },
        xaxis: {
          categories: labels,
          title: {
            text: 'Causes Techniques'
          },
          labels: {
            style: { colors: "#616161", fontSize: "10px" },
            rotate: -45,
            maxHeight: 120
          }
        },
        yaxis: {
          title: {
            text: 'Nombre de Remplacements'
          },
          labels: {
            style: { colors: "#616161", fontSize: "12px" }
          }
        },
        grid: {
          show: true,
          borderColor: "#E5E7EB",
          strokeDashArray: 3
        },
        tooltip: {
          theme: "light",
          y: {
            formatter: function (val) {
              return val + " remplacements"
            }
          }
        }
      }
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">      {/* Date Filters */}
      <Card>
        <CardBody className="p-4">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Filtres par Date
          </Typography>
          
          {/* Compact Filter Layout */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Predefined Date Filter Buttons */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'today', label: "Aujourd'hui" },
                  { key: 'week', label: 'Semaine' },
                  { key: 'month', label: 'Mois' },
                  { key: 'lastMonth', label: 'M. Dernier' },
                  { key: 'quarter', label: 'Trimestre' },
                  { key: 'year', label: 'Année' },
                  { key: 'lastYear', label: 'A. Dernière' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => applyPredefinedFilter(filter.key)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                      activeFilter === filter.key
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                        : 'bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Date Range - Compact */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <input
                type="date"
                name="startDate"
                value={dateFilters.startDate}
                onChange={(e) => {
                  handleDateFilterChange(e);
                  setActiveFilter('custom');
                }}
                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-400 text-sm">à</span>
              <input
                type="date"
                name="endDate"
                value={dateFilters.endDate}
                onChange={(e) => {
                  handleDateFilterChange(e);
                  setActiveFilter('custom');
                }}
                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={applyDateFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors duration-200 text-sm flex items-center gap-1"
              >
                <ChartBarIcon className="h-4 w-4" />
                Appliquer
              </button>
            </div>
          </div>
          
          {/* Current Filter Indicator */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                <strong>Période sélectionnée:</strong> {formatDate(dateFilters.startDate)} - {formatDate(dateFilters.endDate)}
              </span>
              {activeFilter !== 'custom' && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {activeFilter === 'today' && "Aujourd'hui"}
                  {activeFilter === 'week' && "Cette semaine"}
                  {activeFilter === 'month' && "Ce mois"}
                  {activeFilter === 'lastMonth' && "Mois dernier"}
                  {activeFilter === 'quarter' && "Ce trimestre"}
                  {activeFilter === 'year' && "Cette année"}
                  {activeFilter === 'lastYear' && "Année dernière"}
                </span>
              )}
              {activeFilter === 'custom' && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  Période personnalisée
                </span>
              )}
            </div>
          </div>
        </CardBody>
      </Card>{/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  {stats?.overview?.total_rames || 0}
                </Typography>
                <Typography className="text-blue-100">Rames (Total)</Typography>
              </div>
              <Square3Stack3DIcon className="h-12 w-12 text-blue-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  {stats?.overview?.total_raks || 0}
                </Typography>
                <Typography className="text-purple-100">Racks (Total)</Typography>
              </div>
              <CogIcon className="h-12 w-12 text-purple-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  {stats?.overview?.active_cartes_in_period || 0}
                </Typography>
                <Typography className="text-green-100">Cartes Actives (Période)</Typography>
              </div>
              <CpuChipIcon className="h-12 w-12 text-green-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h4" className="text-white font-bold">
                  {stats?.overview?.total_remplacements || 0}
                </Typography>
                <Typography className="text-orange-100">Remplacements (Période)</Typography>
              </div>
              <WrenchScrewdriverIcon className="h-12 w-12 text-orange-200" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Replacement by Cause Chart - Primary Chart */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-red-500 p-2 text-white">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Remplacements par Cause Technique (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            {getReplacementsByCauseChart() && <Chart {...getReplacementsByCauseChart()} />}
          </CardBody>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Replacement Trend Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-blue-500 p-2 text-white">
              <WrenchScrewdriverIcon className="h-6 w-6" />
            </div>            <div>
              <Typography variant="h6" color="blue-gray">
                Tendance des Remplacements (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>          <CardBody className="px-2 pb-0">
            {getReplacementTrendChart() && <Chart {...getReplacementTrendChart()} />}
          </CardBody>
        </Card>

        {/* Status Distribution Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-green-500 p-2 text-white">
              <CpuChipIcon className="h-6 w-6" />
            </div>            <div>
              <Typography variant="h6" color="blue-gray">
                Distribution du Statut des Cartes (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>          <CardBody className="px-2 pb-0">
            {getStatusDistributionChart() && <Chart {...getStatusDistributionChart()} />}
          </CardBody>
        </Card>
      </div>

      {/* Advanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Replacement by Rame Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-purple-500 p-2 text-white">
              <WrenchScrewdriverIcon className="h-6 w-6" />
            </div>            <div>
              <Typography variant="h6" color="blue-gray">
                Remplacements par Rame (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            {getReplacementByRameChart() && <Chart {...getReplacementByRameChart()} />}
          </CardBody>
        </Card>

        {/* Status Distribution by Rame Chart */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-indigo-500 p-2 text-white">
              <CpuChipIcon className="h-6 w-6" />
            </div>            <div>
              <Typography variant="h6" color="blue-gray">
                Distribution du Statut par Rame (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            {getStatusDistributionByRameChart() && <Chart {...getStatusDistributionByRameChart()} />}
          </CardBody>
        </Card>
      </div>

      {/* Activity and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-2 text-white">
              <ClockIcon className="h-6 w-6" />
            </div>            <div>
              <Typography variant="h6" color="blue-gray">
                Activité Récente (Période Sélectionnée)
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0">
            <div className="max-h-80 overflow-y-auto">
              {stats?.recent_activity?.length > 0 ? (
                <div className="space-y-2">
                  {stats.recent_activity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 mx-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Rame {activity.carte_ancienne?.rak?.rame?.NUMERO_RAME}
                        </p>
                        <p className="text-xs text-gray-600">
                          {activity.carte_ancienne?.REFERENCE_CARTE} → {activity.carte_nouvelle?.REFERENCE_CARTE}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(activity.DATE_REMPLACEMENT)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucune activité récente</p>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Maintenance Alerts */}
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-orange-500 p-2 text-white">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alertes de Maintenance
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-0 pb-0">
            <div className="max-h-80 overflow-y-auto">
              {stats?.upcoming_maintenances?.length > 0 ? (
                <div className="space-y-2">
                  {stats.upcoming_maintenances.map((maintenance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 mx-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Rame {maintenance.NUMERO_RAME}
                        </p>
                        <p className="text-xs text-gray-600">
                          Type: {maintenance.TYPE_RAME}
                        </p>
                      </div>
                      <span className="text-xs text-orange-600 font-medium">
                        {formatDate(maintenance.PROCHAINE_MAINTENANCE)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucune maintenance programmée</p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>      
      {/* Performance Metrics */}
      {/* {performance && (
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-indigo-500 p-2 text-white">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Métriques de Performance
              </Typography>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Typography variant="h4" className="text-blue-600 font-bold">
                  {performance.mtbf_hours}h
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  Temps Moyen Entre Pannes (MTBF)
                </Typography>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">                <Typography variant="h4" className="text-green-600 font-bold">
                  {performance.availability_percentage}%
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  Disponibilité du Système
                </Typography>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Typography variant="h4" className="text-purple-600 font-bold">
                  {stats?.overview?.total_remplacements || 0}
                </Typography>
                <Typography className="text-gray-600 text-sm">
                  Total Remplacements
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>      )} */}
    </div>
  );
}

