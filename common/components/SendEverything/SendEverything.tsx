import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'components/renderCbs';
import { TokenValue, Wei } from 'libs/units';
import translate, { translateRaw } from 'translations';
import { sendEverythingRequested, TSendEverythingRequested } from 'actions/transaction';
import { getCurrentBalance } from 'selectors/wallet';
import { AppState } from 'reducers';
import './SendEverything.scss';

interface DispatchProps {
  sendEverythingRequested: TSendEverythingRequested;
}
interface StateProps {
  currentBalance: Wei | TokenValue | null;
}
type Props = StateProps & DispatchProps;

class SendEverythingClass extends Component<Props> {
  public render() {
    const { currentBalance } = this.props;

    return (
      <Query
        params={['readOnly']}
        withQuery={({ readOnly }) => (
          <button
            className="SendEverything"
            disabled={!!readOnly || !currentBalance}
            onClick={e => {
              e.preventDefault();
              this.onSendEverything();
            }}
            aria-label={translateRaw('SEND_TRANSFERTOTAL')}
          >
            {translate('SEND_TRANSFERTOTAL')}
          </button>
        )}
      />
    );
  }
  private onSendEverything = () => {
    this.props.sendEverythingRequested();
  };
}
export const SendEverything = connect(
  (state: AppState) => ({ currentBalance: getCurrentBalance(state) }),
  { sendEverythingRequested }
)(SendEverythingClass);
