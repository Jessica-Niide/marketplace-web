import { useQuery } from '@tanstack/react-query'
import { format, interval, isValid, isWithinInterval, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { UserMultipleIcon } from 'hugeicons-react'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import { getViewsPerDayMetrics, ViewsPerDay } from '@/api/views-per-day-metrics'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { Card } from '../ui/card'

const formatDate = (date: Date) => {
  return format(date, 'dd', {
    locale: ptBR,
  })
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="space-y-2 rounded-md border bg-white p-2">
        <p className="text-body-sm uppercase text-medium">
          {isValid(new Date(label))
            ? format(label, "dd 'de' MMM", {
                locale: ptBR,
              })
            : label}
        </p>
        <div className="flex items-center gap-2">
          <UserMultipleIcon size={16} />
          <p className="text-body-sm">{payload[0].payload.amount} visitantes</p>
        </div>
      </div>
    )
  }

  return null
}

const VisitorsChart = () => {
  const { data } = useQuery({
    queryKey: ['views-per-day'],
    queryFn: getViewsPerDayMetrics,
  })
  const [chartData, setChartData] = React.useState<ViewsPerDay[] | undefined>(
    data,
  )
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: data ? new Date(data[0].date) : subDays(new Date(), 30),
    to: data ? new Date(data[data.length - 1].date) : new Date(),
  })
  const handleSetFilter = () => {
    if (range && range.from && range.to) {
      const dateRange = interval(range.from, range?.to)
      const filteredData = data?.filter((item) =>
        isWithinInterval(item.date, dateRange),
      )
      if (filteredData) {
        setChartData(filteredData)
      }
    }
    setCalendarOpen(false)
  }

  const handleClearFilter = () => {
    const filteredData = data
    setRange({
      from: data ? new Date(data[0].date) : subDays(new Date(), 30),
      to: data ? new Date(data[data.length - 1].date) : new Date(),
    })
    if (filteredData) {
      setChartData(filteredData)
    }
    setCalendarOpen(false)
  }

  return (
    <Card className="flex flex-col items-center gap-4 p-8">
      <div className="flex w-full items-center justify-between">
        <span className="font-titles text-title-sm text-dark">Visitantes</span>
        <div className="grid gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'link'}
                size={'sm'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal hover:text-blue-dark',
                  !range && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-dark" />
                {range?.from ? (
                  range.to ? (
                    <>
                      {format(range.from, 'LLL dd, y')} -{' '}
                      {format(range.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(range.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={range?.from}
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
              />
              <div className="flex items-center justify-between p-4">
                <Button
                  className="border border-blue-base bg-background text-blue-dark hover:bg-blue-light"
                  size="sm"
                  onClick={handleClearFilter}
                >
                  Limpar filtro
                </Button>
                <Button
                  className="bg-blue-base hover:bg-blue-dark"
                  size="sm"
                  disabled={!range || !range.from || !range.to}
                  onClick={handleSetFilter}
                >
                  Definir intervalo
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="10" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickFormatter={formatDate}
          ></XAxis>
          <YAxis stroke="#888" tickLine={false} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <Line type={'monotone'} dataKey="amount" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { VisitorsChart }
