'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter';

export interface ChartsWidgetProps {
  /**
   * The type of chart to render.
   * Requires `@mui/x-charts` to be installed as a peer dependency.
   */
  type: ChartType;
  /**
   * Data series passed to the chart component.
   */
  series: unknown[];
  /**
   * X-axis configuration (bar and line charts).
   */
  xAxis?: unknown[];
  /**
   * Width of the chart in pixels.
   * @default 400
   */
  width?: number;
  /**
   * Height of the chart in pixels.
   * @default 300
   */
  height?: number;
  /**
   * Any additional props forwarded to the underlying chart component.
   */
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyChart = React.ComponentType<any>;

type ChartModule = {
  BarChart: AnyChart;
  LineChart: AnyChart;
  PieChart: AnyChart;
  ScatterChart: AnyChart;
};

/**
 * A thin wrapper around `@mui/x-charts` chart components.
 * The charts library is loaded dynamically at render time — if it is not
 * installed the component logs a warning and renders nothing.
 *
 * @example
 * ```tsx
 * <ChartsWidget
 *   type="bar"
 *   series={[{ data: [4, 3, 5] }]}
 *   xAxis={[{ data: ['A', 'B', 'C'] }]}
 * />
 * ```
 */
function ChartsWidget(props: ChartsWidgetProps) {
  const { type, series, xAxis, width = 400, height = 300, ...rest } = props;

  const [ChartComponent, setChartComponent] = React.useState<AnyChart | null>(null);
  const [unavailable, setUnavailable] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    import('@mui/x-charts')
      .then((mod: ChartModule) => {
        if (cancelled) {
          return;
        }
        const map: Record<ChartType, React.ComponentType<Record<string, unknown>>> = {
          bar: mod.BarChart,
          line: mod.LineChart,
          pie: mod.PieChart,
          scatter: mod.ScatterChart,
        };
        setChartComponent(() => map[type]);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(
              '[Toolpad] ChartsWidget: @mui/x-charts is not installed. ' +
                'Add it as a dependency to use ChartsWidget.',
            );
          }
          setUnavailable(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [type]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (unavailable || !ChartComponent) {
    return null;
  }

  return (
    <ChartComponent
      series={series as Record<string, unknown>[]}
      xAxis={xAxis as Record<string, unknown>[]}
      width={width}
      height={height}
      {...rest}
    />
  );
}

export { ChartsWidget };
