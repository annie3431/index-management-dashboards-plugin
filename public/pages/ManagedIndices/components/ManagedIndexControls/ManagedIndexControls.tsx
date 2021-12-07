/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from "react";
import { EuiFlexGroup, EuiFlexItem, EuiSwitch } from "@elastic/eui";
import EuiRefreshPicker from "../../../../temporary/EuiRefreshPicker";
import { DataStream } from "../../../../../server/models/interfaces";

interface ManagedIndexControlsProps {
  showDataStreams: boolean;
  onRefresh: () => void;
  getDataStreams: () => Promise<DataStream[]>;
  toggleShowDataStreams: () => void;
}

export default class ManagedIndexControls extends Component<ManagedIndexControlsProps, object> {
  state = {
    refreshInterval: 0,
    isPaused: true,
  };

  onRefreshChange = ({ refreshInterval, isPaused }: { refreshInterval: number; isPaused: boolean }) => {
    this.setState({ isPaused, refreshInterval });
  };

  getDataStreams = async () => {
    return (await this.props.getDataStreams()).map((ds) => ({ value: ds.name }));
  };

  render() {
    const { onRefresh, showDataStreams, toggleShowDataStreams } = this.props;
    const { refreshInterval, isPaused } = this.state;

    return (
      <EuiFlexGroup style={{ padding: "0px 5px" }} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Show data stream indices"
            checked={showDataStreams}
            onChange={toggleShowDataStreams}
            data-test-subj="toggleShowDataStreams"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ maxWidth: 250 }}>
          <EuiRefreshPicker
            isPaused={isPaused}
            refreshInterval={refreshInterval}
            onRefreshChange={this.onRefreshChange}
            onRefresh={onRefresh}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
