import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-social-network-graph',
  templateUrl: './social-network-graph.component.html',
  styleUrls: ['./social-network-graph.component.scss']
})
export class SocialNetworkGraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   d3.json('../../assets/data/network-graph.json', (err: any, graph: any) => {
      console.log(graph);
      this.loadGraph(graph);
    });
  }



  loadGraph(graph: any) {
    // Compute the distinct nodes from the links.
    const links = graph.links;
    const nodeColor = d3.scale.category20();
    const width = 600; const height = 300;
    const force = d3.layout.force()
      .nodes(graph.nodes)
      .links(links)
      .size([width, height])
      .linkDistance((d: any) => {
        return 1 / d.value * 100;
      })
      .gravity(0.046)
      .charge(-8)
      .on('tick', tick)
      .start();

    // Set the range
    const v = d3.scale.linear().range([0, 100]);

    // Scale the range of the data
    v.domain([0, d3.max(links, (d: any) => d.value / 1000)]);

    // asign a type per value to encode opacity
    links.forEach((link) => {
      if (v(link.value) <= 25) {
        link.type = 'twofive';
      } else if (v(link.value) <= 50 && v(link.value) > 25) {
        link.type = 'fivezero';
      } else if (v(link.value) <= 75 && v(link.value) > 50) {
        link.type = 'sevenfive';
      } else if (v(link.value) <= 100 && v(link.value) > 75) {
        link.type = 'onezerozero';
      }
    });

    const svg = d3.select('.network-graph-view').append('svg')
      .attr('width', width)
      .attr('height', height);

    // build the arrow.
    svg.append('svg:defs').selectAll('marker')
      .data(['end'])      // Different link/path types can be defined here
      .enter().append('svg:marker')    // This section adds in the arrows
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    // add the links and the arrows
    const path = svg.append('svg:g').selectAll('path')
      .data(force.links())
      .enter().append('svg:path')
      .attr('class', (d: any) => 'link ' + d.type)
      .attr('marker-end', 'url(#end)');

    // define the nodes
    const node = svg.selectAll('.node')
      .data(force.nodes())
      .enter().append('g')
      .attr('class', 'node')
      .on('click', click)
      .on('dblclick', dblclick)
      .call(force.drag);

    // add the nodes
    node.append('circle')
      .attr('r', (d: any) => {
        if (d.group >= 1780) {
          return 15;
        } else {
          return 6;
        }
      })
      .style('fill', (d: any) => {
        if (d.group >= 1780) {
          return 'black';
        } else if (d.believed === true) {
          return 'blue';
        } else {
          return 'red';
        }
      });

    // Tooltip
    node.append('title')
      .text((d: any) => {
        return d.user_name;
      });

    // add the text
    // node.append("text")
    //         .attr("x", 12)
    //         .attr("dy", ".35em")
    //         .text(function(d) { return d.name; });

    // add the curvy lines
    function tick() {
      path.attr('d', (d: any) => {
        const dx = d.target.x - d.source.x;
        const  dy = d.target.y - d.source.y;
        const  dr = Math.sqrt(dx * dx + dy * dy);
        return 'M' +
          d.source.x + ',' +
          d.source.y + 'A' +
          dr + ',' + dr + ' 0 0,1 ' +
          d.target.x + ',' +
          d.target.y;
      });

      node
        .attr('transform', (d) => {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
    }

    // action to take on mouse click
    function click() {
      d3.select(this).select('text').transition()
        .duration(750)
        .attr('x', 22)
        .style('fill', 'steelblue')
        .style('stroke', 'lightsteelblue')
        .style('stroke-width', '.5px');
      d3.select(this).select('circle').transition()
        .duration(750)
        .attr('r', (d: any) => {
          if (d.group >= 1780) {
            return 20;
          } else {
            return 10;
          }
        })
        .style('fill', (d) => {
          if (d.group >= 1780) {
            return 'black';
          } else if (d.believed === true) {
            return 'Blue';
          } else {
            return 'Red';
          }
        });
    }

    // action to take on mouse double click
    function dblclick() {
      d3.select(this).select('circle').transition()
        .duration(750)
        .attr('r', (d: any) => {
          if (d.group >= 1780) {
            return 15;
          } else {
            return 6;
          }
        })
        .style('fill', (d) => {
          return nodeColor(d.group);
        });
      d3.select(this).select('text').transition()
        .duration(750)
        .attr('x', 12)
        .style('stroke', 'none')
        .style('fill', 'black')
        .style('stroke', 'none')
        .style('font', '10px sans-serif');
    }

  }

}
