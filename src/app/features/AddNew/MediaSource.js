import React, { useState } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DebounceInput } from 'react-debounce-input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import YouTube from 'react-youtube';
import { getVideoIdFromUrl } from '../../utils/utils';

const TabPanel = ({ children, activeTab, value }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== activeTab}
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
    >
      {value === activeTab && <div>{children}</div>}
    </div>
  );
};

const MediaSource = ({ formElement, changeType, changeMediaValue }) => {
  const [activeTab, setActiveTab] = useState('file');

  const tabs = [
    {
      id: 0,
      type: 'file',
      label: 'Z dysku',
    },
    {
      id: 1,
      type: 'url',
      label: 'Z adresu url',
    },
    {
      id: 2,
      type: 'yt-video',
      label: 'Video z Youtube',
    },
  ];

  const additionalProps = (type) => {
    return {
      id: `media-tab-${type}`,
      'aria-controls': `media-tabpanel-${type}`,
      value: type,
    };
  };

  const handleChangeType = (event, newValue) => {
    setActiveTab(newValue);
    changeType(newValue);
  };

  const handleChangeMediaValue = (e, type) => {
    changeMediaValue(type === 'file' ? e.target.files[0].name : e.target.value);
  };

  return (
    <>
      <StyledTabs
        centered
        value={activeTab}
        onChange={handleChangeType}
        aria-label='media source tabs'
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} {...additionalProps(tab.type)} />
        ))}
      </StyledTabs>
      <TabPanel value='file' activeTab={activeTab}>
        <HiddenInput
          id='contained-button-file'
          type='file'
          accept='.png, .jpg, .jpeg'
          onChange={(e, type) => {
            handleChangeMediaValue(e, type);
          }}
        />
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='span'>
            Wybierz plik
          </Button>
        </label>
      </TabPanel>
      <TabPanel value='url' activeTab={activeTab}>
        {formElement.config.valid && (
          <ImagePlaceholderWrapper
            href={formElement.config.value}
            target='_blank'
          >
            <img src={formElement.config.value} alt='' />
          </ImagePlaceholderWrapper>
        )}
        <InputWrapper>
          <DebounceInput
            autoFocus
            debounceTimeout={500}
            element={TextField}
            variant='outlined'
            fullWidth
            type='url'
            label='Adres url do zdjęcia'
            helperText={
              !formElement.config.valid && formElement.config.touched
                ? 'Brak zdjęcia pod tym adresem.'
                : ''
            }
            error={!formElement.config.valid && formElement.config.touched}
            required={formElement.config.validation.required}
            value={formElement.config.value}
            onChange={(e, type) => {
              handleChangeMediaValue(e, type);
            }}
            rows='4'
            placeholder='http://www.adres.pl/nazwa-obrazka.jpg'
          />
        </InputWrapper>
      </TabPanel>
      <TabPanel value='yt-video' activeTab={activeTab}>
        {formElement.config.valid && (
          <VideoPlaceholderWrapper>
            <YouTube videoId={getVideoIdFromUrl(formElement.config.value)} />
          </VideoPlaceholderWrapper>
        )}
        <InputWrapper>
          <DebounceInput
            autoFocus
            debounceTimeout={500}
            element={TextField}
            variant='outlined'
            fullWidth
            type='url'
            label='Link do video'
            helperText={
              !formElement.config.valid && formElement.config.touched
                ? 'Video z tego linku nie jest dostępne na YouTube.'
                : ''
            }
            error={!formElement.config.valid && formElement.config.touched}
            required={formElement.config.validation.required}
            value={formElement.config.value}
            onChange={(e, type) => {
              handleChangeMediaValue(e, type);
            }}
            rows='4'
            placeholder='https://www.youtube.com/watch?v=bD6eaJFpW7Q'
          />
        </InputWrapper>
      </TabPanel>
    </>
  );
};

const StyledTabs = styled(Tabs)`
  margin: 20px 0 25px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ImagePlaceholderWrapper = styled.a`
  display: block;
  margin: 20px auto;
  text-align: center;

  img {
    max-width: 200px;
    vertical-align: middle;
  }
`;

const VideoPlaceholderWrapper = styled.div`
  position: relative;
  padding-bottom: 26.25%;
  height: 0;
  max-width: 300px;
  margin: 30px auto;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default MediaSource;
