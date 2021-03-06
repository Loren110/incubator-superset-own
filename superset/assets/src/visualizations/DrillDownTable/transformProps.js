/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable sort-keys */
export default function transformProps(chartProps) {
  const { height, datasource, filters, formData, onAddFilter, payload } = chartProps;
  const {
    alignPn,
    colorPn,
    includeSearch,
    metrics,
    orderDesc,
    pageLength,
    percentMetrics,
    tableFilter,
    tableTimestampFormat,
    timeseriesLimitMetric,
  } = formData;
  const { columnFormats, verboseMap } = datasource;
  const { records, columns } = payload.data[0];
  const records2 = payload.data[1] && payload.data[1].records;
  const columns2 = payload.data[1] && payload.data[1].columns;

  const processedColumns = columns.map(key => {
    let label = verboseMap[key];
    // Handle verbose names for percents
    if (!label) {
      if (key[0] === '%') {
        const cleanedKey = key.substring(1);
        label = `% ${verboseMap[cleanedKey] || cleanedKey}`;
      } else {
        label = key;
      }
    }

    return {
      key,
      label,
      format: columnFormats && columnFormats[key],
    };
  });

  const processedColumns2 = columns2.map(key => {
    let label = verboseMap[key];
    // Handle verbose names for percents
    if (!label) {
      if (key[0] === '%') {
        const cleanedKey = key.substring(1);
        label = `% ${verboseMap[cleanedKey] || cleanedKey}`;
      } else {
        label = key;
      }
    }

    return {
      key,
      label,
      format: columnFormats && columnFormats[key],
    };
  });

  return {
    height,
    formData,
    primaryData: records,
    secondaryData: records2,
    // data: payload.data,
    alignPositiveNegative: alignPn,
    colorPositiveNegative: colorPn,
    columns: processedColumns,
    columns2: processedColumns2,
    filters,
    includeSearch,
    metrics,
    onAddFilter,
    orderDesc,
    pageLength: pageLength && parseInt(pageLength, 10),
    percentMetrics,
    tableFilter,
    tableTimestampFormat,
    timeseriesLimitMetric,
  };
}
