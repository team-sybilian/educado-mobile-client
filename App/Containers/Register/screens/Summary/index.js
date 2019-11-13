import Title from 'App/Components/Title';
import { AnimatedView } from 'App/Components/Animated';
import NavigationService from 'App/Services/NavigationService';
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import {
  View,
  Label,
  RKText,
  Moment,
  ScrollView,
  ViewPadding,
  ViewInputContainer,
} from 'App/Components/UI';
import PropTypes from 'prop-types';
import { CONFIG } from './config';
import styles from './styles';

export class Summary extends PureComponent {
  componentDidMount = () => {
    const { navigation } = this.props;

    navigation.setParams({
      nextTitle: 'Finish',
      nextFunc: this.onNextStep,
      title: 'Please verify',
      disableNext: false,
    });
  };

  onSubmit = () => {
    // const {} = this.props;
    // this.props.resaga.dispatchTo();
    NavigationService.navigateAndResetStack('DashboardScreen');
  };

  onNextStep = () => {
    const { page, nextStep } = this.props;
    nextStep(page, this.onSubmit);
  };

  renderStudentInfo = () => {
    const {
      name,
      dateOfBirth,
      placeOfBirth,
      studentNumber,
      school,
      email,
      phone,
      sourceOfFunds,
      presentAddress,
      permanentAddress,
    } = this.props;

    return (
      <ViewPadding>
        <Title title="Student Details" />
        <View style={styles.container}>
          <ViewPadding>
            <Label label="NAME" />
            <RKText style={styles.text}>{name}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="EMAIL" />
            <RKText style={styles.text}>{email}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="PHONE" />
            <RKText style={styles.text}>{phone}</RKText>
          </ViewPadding>
          <View style={styles.row}>
            <ViewPadding style={styles.grow}>
              <Label label="SCHOOL" />
              <RKText style={styles.text}>{school.text}</RKText>
            </ViewPadding>
            <ViewPadding style={styles.grow}>
              <Label label="STUDENT NO." />
              <RKText style={styles.text}>{studentNumber}</RKText>
            </ViewPadding>
          </View>
          <View style={styles.row}>
            <ViewPadding style={styles.grow}>
              <Label label="DATE OF BIRTH" />
              <Moment date={dateOfBirth} style={styles.text} />
            </ViewPadding>
            <ViewPadding style={styles.grow}>
              <Label label="PLACE OF BIRTH" />
              <RKText style={styles.text}>{placeOfBirth}</RKText>
            </ViewPadding>
          </View>
          <ViewPadding>
            <Label label="PRESENT ADDRESS" />
            <RKText style={styles.text}>{presentAddress}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="PERMANENT ADDRESS" />
            <RKText style={styles.text}>{permanentAddress}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="SOURCE OF FUNDS" />
            <RKText style={styles.text}>{sourceOfFunds.text}</RKText>
          </ViewPadding>
        </View>
      </ViewPadding>
    );
  };

  renderGuarantorInfo = () => {
    const {
      hasGuarantor,
      guarantorName,
      guarantorEmail,
      guarantorPhone,
      guarantorDate,
      guarantorPlace,
      guarantorSource,
      guarantorPresent,
      guarantorPermanent,
    } = this.props;

    if (!hasGuarantor) {
      return null;
    }

    return (
      <ViewPadding>
        <Title title="Guarantor Details" />
        <View style={styles.container}>
          <ViewPadding>
            <Label label="NAME" />
            <RKText style={styles.text}>{guarantorName}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="EMAIL" />
            <RKText style={styles.text}>{guarantorEmail}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="PHONE" />
            <RKText style={styles.text}>{guarantorPhone}</RKText>
          </ViewPadding>
          <View style={styles.row}>
            <ViewPadding style={styles.grow}>
              <Label label="DATE OF BIRTH" />
              <Moment date={guarantorDate} style={styles.text} />
            </ViewPadding>
            <ViewPadding style={styles.grow}>
              <Label label="PLACE OF BIRTH" />
              <RKText style={styles.text}>{guarantorPlace}</RKText>
            </ViewPadding>
          </View>
          <ViewPadding>
            <Label label="PRESENT ADDRESS" />
            <RKText style={styles.text}>{guarantorPresent}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="PERMANENT ADDRESS" />
            <RKText style={styles.text}>{guarantorPermanent}</RKText>
          </ViewPadding>
          <ViewPadding>
            <Label label="SOURCE OF INCOME" />
            <RKText style={styles.text}>{guarantorSource.text}</RKText>
          </ViewPadding>
        </View>
      </ViewPadding>
    );
  };

  render() {
    return (
      <ViewInputContainer>
        <ScrollView style={{ marginTop: 6 }}>
          <AnimatedView animation="fadeIn" duration={700}>
            <ViewPadding style={styles.backdrop}>
              <RKText category="c2" style={styles.message}>
                {'Please verify all the details below then press "Finish" button to proceed. '
                  + 'Press the circle steppers to go back to specified step.'}
              </RKText>
            </ViewPadding>
            {this.renderStudentInfo()}
            {this.renderGuarantorInfo()}
          </AnimatedView>
        </ScrollView>
      </ViewInputContainer>
    );
  }
}

Summary.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  page: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,

  // student
  name: PropTypes.string,
  school: PropTypes.object,
  studentNumber: PropTypes.string,
  placeOfBirth: PropTypes.string,
  dateOfBirth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  email: PropTypes.string,
  phone: PropTypes.string,
  sourceOfFunds: PropTypes.object,
  presentAddress: PropTypes.string,
  permanentAddress: PropTypes.string,

  // guarantor
  hasGuarantor: PropTypes.bool,
  guarantorName: PropTypes.string,
  guarantorEmail: PropTypes.string,
  guarantorPhone: PropTypes.string,
  guarantorPlace: PropTypes.string,
  guarantorSource: PropTypes.object,
  guarantorPresent: PropTypes.string,
  guarantorPermanent: PropTypes.string,
  guarantorDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Summary.defaultProps = {};

export default resaga(CONFIG)(Summary);