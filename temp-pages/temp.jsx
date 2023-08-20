import React from 'react'
import MissionReview from './MissionReview'
import AdminSetting from './AdminSetting'
import HelpCentre from './HelpCentre'
import MissionTemplatePage from './MissionTemplatePage'
import FirstPage from './FirstPage'
import NoAccountPopup from './NoAccountPopup'
import LoginSplit from './LoginSplit'
import MissionKickassBlogPost from './MissionKickassBlogPost'
import InstallMetamaskPopup from './InstallMetamaskPopup'
import CopyLinkPopUpFormBuilder from '@/components/molecules/CopyLinkPopUpFormBuilder'
import DiscordVerificationUser from '@/components/molecules/DiscordVerificationUser'
import MissionForUser from './MissionForUser'

export default function index() {
  return (
    <div>
      <FirstPage/>
    </div>
  );
}