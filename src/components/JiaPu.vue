<template>
  <div>
    <h1>家谱</h1>
    <svg class="jiapu-plain-svg" width="700" height="1000"></svg>
  </div>
</template>

<script>
// 引入d3
import * as d3 from 'd3'
export default {
  data(){
    return{
      
    }
  },
  methods:{
    draw(){
      var tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip") //用于css设置类样式
        .attr("opacity", 0.0);

      var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

      var tree = d3.tree().size([height, width - 160]);

      var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      };

      //贝塞尔曲线
      var diagonal = d3
        .linkHorizontal()
        .x((d) => d.x)
        .y((d) => d.y);

      d3.json(
        "https://picgorepo.oss-cn-beijing.aliyuncs.com/family_data/jiapu.json"
      ).then((data) => {
        console.log(data);
        const root = d3.hierarchy(data);

        root.x0 = 1;
        root.y0 = 0;
        root.descendants().forEach((d, i) => {
          d.id = i;
          d._children = d.children;

          if (d.depth && d.data.name.length !== 7) d.children = null;
        });

        svg
          //			.attr("viewBox", [-margin.left, -margin.top, width, 100])
          .style("font", "19px sans-serif")
          .style("user-select", "none");

        const G = svg.append("g");

        const zoom = d3.zoom().scaleExtent([0.5, 20]).on("zoom", zoomed);
        svg.call(zoom);
        function zoomed() {
          G.attr("transform", d3.event.transform);
        }

        const gLink = G.append("g")
          .attr("fill", "none")
          .attr("stroke", "#555")
          .attr("stroke-opacity", 0.4)
          .attr("stroke-width", 1.5);

        const gNode = G.append("g")
          .attr("cursor", "pointer")
          .attr("pointer-events", "all");

        function update(source) {
          const duration = d3.event && d3.event.altKey ? 2500 : 250;
          const nodes = root.descendants().reverse();
          const links = root.links();

          var width1 = 1150 + root.leaves().length * 50;
			    var height1 = 50 + root.height * 50;

          var tree = d3
            .tree()
            .size([width1, height1])
            .separation(function (a, b) {
              return a.parent == b.parent ? 0.5 : 2;
            });
          tree(root);

          let left = root;
          let right = root;
          root.eachBefore((node) => {
            if (node.x < left.x) left = node;
            if (node.x > right.x) right = node;
          });

          const height = right.x - left.x + margin.top + margin.bottom;

          const transition = svg
            .transition()
            .duration(duration)
            .attr("viewBox", [
              240,
              200,
              900,
              height,
            ])
            .tween(
              "resize",
              window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
            );

          // Update the nodes…
          const node = gNode.selectAll("g").data(nodes, (d) => d.id);

          // 新增的节点先奔向之前source的位置
          const nodeEnter = node
            .enter()
            .append("g")
            .attr("transform", (d) => `translate(${source.x0},${source.y0})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
            .on("click", (d) => {
              d.children = d.children ? null : d._children;
              update(d);
            })
            .on("mousemove", (d, i) => {
              var x = d3.event.pageX;
              var y = d3.event.pageY + 30;
              console.log("name is: " + d.data.name);
              console.log("pic is: " + d.data.pic);
              var tmpHeader = "https://picgorepo.oss-cn-beijing.aliyuncs.com/moleSmallIcon.jpg"
              var outputHtml = '<img height="100" width="100"  src="https://picgorepo.oss-cn-beijing.aliyuncs.com/moleSmallIcon.jpg"/>' +
                  '<div>' + d.data.name + '</div>' + 
                  '<div>' + "介绍" + '</div>'
              if (d.data.pic) {
                outputHtml = '<img  height="100" width="100"  src=' + '"' + d.data.pic + '"' + '/>' +
                  '<div>' + d.data.name + '</div>' + 
                  '<div>' + "介绍" + '</div>';
                console.log("your output html is: " + outputHtml);
                
              }


              tooltip.style("opacity", 0.0);
              tooltip
                .html(
                  outputHtml
                )
                .style("left", x - 130 + "px")
                .style("top", y + "px")
                .style("opacity", 1.0);
            })
            .on("mouseout", function (d, i) {
              tooltip.style("opacity", 0.0);
            });

          nodeEnter
            .append("circle")
            .attr("r", 5)
            .attr("fill", (d) => (d._children ? "red" : "#999"))
            .attr("stroke-width", 1);

          nodeEnter
            .append("text")
            .attr("dy", "0.31em")
            .attr("x", (d) => (d._children ? -6 : 6))
            .attr("text-anchor", (d) => (d._children ? "end" : "start"))
            .text((d) => d.data.name)
            .clone(true)
            .lower()
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .attr("stroke", "#ccc");

          // 所有节点奔赴新的位置
          const nodeUpdate = node
            .merge(nodeEnter)
            .transition(transition)
            .attr("transform", (d) => `translate(${d.x},${d.y})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);

          // 消失的节点过度效果
          const nodeExit = node
            .exit()
            .transition(transition)
            .remove()
            .attr("transform", (d) => `translate(${source.x},${source.y})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

          // Update the links…
          const link = gLink.selectAll(".link").data(links, (d) => d.target.id);

          // 新加入的线条线全部归并到source之前位置
          const linkEnter = link.enter().append("path").attr("class", "link");

          // 所有的线出现在正确的位置上
          link.merge(linkEnter).transition(transition).attr("d", diagonal);

          // 即将消失的线归并到source现在的位置上
          link
            .exit()
            .transition(transition)
            .remove()
            .attr("d", (d) => {
              const o = {
                x: source.x,
                y: source.y,
              };
              return diagonal({
                source: o,
                target: o,
              });
            });

          //所有的点记录之前的位置
          root.eachBefore((d) => {
            d.x0 = d.x;
            d.y0 = d.y;
          });
        }
        update(root);
      });
    },
  },
  mounted(){
    this.draw()
  }
}
</script>
<style scoped>
  .jiapu-plain-svg {
    border: 1px solid black;
  }
  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 1.5px;
  }

  .node {
    font: 12px sans-serif;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
  }
  #tooltip {
    font-family: simsun;
    font-size: 16px;
    width: 120;
    height: auto;
    position: absolute;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    background-color: white;
    padding: 10px;
  }
</style>