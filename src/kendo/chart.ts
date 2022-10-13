export class KendoChartHelper {
    public static resizeCharts = () => {
        $(".k-chart").each(function () {
            const kchart = $(this).data("kendoChart");

            kchart.resize();
        });
    }
}