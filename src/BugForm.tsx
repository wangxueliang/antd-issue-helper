import * as React from 'react';
import { Form, Col, Input, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { FormattedMessage } from 'react-intl';
import I18n from './I18n';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

export interface BugFormProps {
  form: WrappedFormUtils;
  versions: string[];
  similarIssues: any[];
}

export default function BugForm({
  form,
  versions,
  similarIssues,
}: BugFormProps) {
  const { getFieldDecorator } = form;

  return (
    <div>
      <FormItem>
        <Col span={11}>
          <FormItem
            label={
              <FormattedMessage id="issue.version" defaultMessage="Version" />
            }
            help={
              <FormattedMessage
                id="issue.versionHelp"
                defaultMessage="Check if the issue is reproducible with the latest stable version."
              />
            }
          >
            {getFieldDecorator('version', {
              initialValue: versions[0],
            })(
              <Select showSearch={true}>
                {versions.map(version =>
                  <Option key={version}>{version}</Option>,
                )}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col span={12} offset={1}>
          <FormItem
            label={
              <FormattedMessage
                id="issue.reproduction"
                defaultMessage="Link to minimal reproduction"
              />
            }
            help={<I18n id="reproHelp" />}
          >
            {getFieldDecorator('reproduction', {
              rules: [{ required: true }],
            })(<Input type="url" />)}
          </FormItem>
        </Col>
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="issue.environment"
            defaultMessage="Environment"
          />
        }
        help={
          <FormattedMessage
            id="issue.environmentHelp"
            defaultMessage="OS version, browser version, react-native version..."
          />
        }
      >
        {getFieldDecorator('environment', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="issue.steps"
            defaultMessage="Step to reproduce"
          />
        }
        help={<I18n id="stepsHelp" />}
      >
        {getFieldDecorator('steps', {
          rules: [{ required: true }],
        })(<TextArea autosize={{ minRows: 2 }} />)}
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="issue.expected"
            defaultMessage="What is expected?"
          />
        }
      >
        {getFieldDecorator('expected', {
          rules: [{ required: true }],
        })(<TextArea autosize={{ minRows: 2 }} />)}
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="issue.actually"
            defaultMessage="What is actually happening?"
          />
        }
      >
        {getFieldDecorator('actual', {
          rules: [{ required: true }],
        })(<TextArea autosize={{ minRows: 2 }} />)}
      </FormItem>
      <FormItem
        label={
          <FormattedMessage
            id="issue.extra"
            defaultMessage="Any additional comments?(optional)"
          />
        }
        help={
          <FormattedMessage
            id="issue.extraHelp"
            defaultMessage="e.g. some background/context of how you ran into this bug."
          />
        }
      >
        {getFieldDecorator('extra', {})(<TextArea autosize={{ minRows: 2 }} />)}
      </FormItem>
    </div>
  );
}
