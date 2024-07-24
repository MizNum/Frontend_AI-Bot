import { CommonModule } from '@angular/common';
import { Component, OnInit,Renderer2, HostListener, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router, Navigation } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '../popup.service';
import { filter } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Environment } from '../environment';
import { eventNames } from 'process';
import { ResponseService } from '../response.service';
import { LoaderComponent } from '../loader/loader.component';
import { WaitComponent } from '../wait/wait.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,MatCardModule,LoaderComponent,WaitComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  @ViewChild('chatContainer') chatContainerRef!: ElementRef;
  @ViewChild('output') outputRef!: ElementRef;
  @ViewChild('closeButton') closeButtonRef!: ElementRef;
  
  recognition: any;
  errorMessage: string | null = null;
  lang!:any;


  constructor(
    private route: ActivatedRoute,
    private popUpService: PopupService,
    private router: Router,
    private renderer : Renderer2,
    private response : ResponseService
  ) { }
 
  textInput = '';
  session ! :any;
  conversation: any;
  video = false;
  aFlag = false;
  modeFlag = false;
  mic = true;
  relativePath = 'http://localhost:3000';
  relativeVideoPath = 'http://localhost:3000/Video/';
  
  preLanguage = [''];
  currentLanguage = 'en';
  languages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Azerbaijani", code: "az" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Filipino (Tagalog)", code: "tl" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jv" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Korean", code: "ko" },
    { name: "Kurdish", code: "ku" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar (Burmese)", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Nyanja (Chichewa)", code: "ny" },
    { name: "Odia (Oriya)", code: "or" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala (Sinhalese)", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tagalog (Filipino)", code: "tl" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba", code: "yo" },
    { name: "Zulu", code: "zu" }
  ];
  isRecording = false;
  mediaRecorder: any;
  audioChunks: any[] = [];
  transcript: string | null = null;
  recording = false;
 






  wait = false;
  startWaiting(){
    this.wait = true;
  }
  stopWaiting(){
    this.wait = false;
  }


  loading = false;
  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }


  ngOnInit(): void {

    this.preLanguage.push(this.currentLanguage);
    this.session = localStorage.getItem('session');
    // if((this.session !== 'true')){
    //     this.popUpService.toast('Please login first.');
    //     this.router.navigate(['']);

    // }

    this.conversation = [
      {
        "type": "bot_response",
        "sender": "bot",
        "timestamp": new Date().toISOString(),
        "name": "bot",
        "videoUrl": "", 
        "showBtnflag": false,
        "vflag":false,
        "vtlag":false,
        "Summary": "",
        "startTime": "hh:mm:ss",
        "endTime": "hh:mm:ss",
        "result": "Hi there, how may I help you?",
        "seekTime": {
          "end": 0,
          "id": 0,
          "seek": 0,
          "start": 0,
          "text": "",
          "video_name": ""
        },
        "source": "Default message by bot"
      }
    ];


    
    this.initSpeechRecognition();
    // console.log('intital speech is recoginized.')

  }



  ngAfterViewInit(): void {  }

  initSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition ||
                              (window as any).mozSpeechRecognition ||
                              (window as any).msSpeechRecognition;

    if (!SpeechRecognition) {
      this.errorMessage = "Web Speech API is not supported in this browser.";
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.outputRef.nativeElement.value ='Listening....';
        };

    this.recognition.onresult = (event: any) => {
      this.outputRef.nativeElement.value = event.results[0][0].transcript;
      this.textInput = event.results[0][0].transcript;
      // console.log(this.textInput);
    };

    this.recognition.onerror = (event: any) => {
      this.errorMessage = `Error occurred in recognition: ${event.error}`;
      this.popUpService.toast('Error occurrred in  recognition');
    };

    this.recognition.onend = (event: any) => {
      this.mic = false;
      this.recording = false;
    };
  }

  startVoiceInput(): void {
    this.recording = true;
    if (this.recognition) {
      this.errorMessage = null;
      this.recognition.start();
      // this.mic = false;
    } else {
      this.errorMessage = "Speech recognition is not initialized.";
    }
  }
  stopVoiceInput(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.mic = false;
    this.recording = false;
    this.outputRef.nativeElement.value = '';
  }




  scrollToBottom() {
    const chatContainer = this.chatContainerRef.nativeElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  
  }


  async changeLanguage(){
    this.preLanguage.push(this.currentLanguage);
    // console.log('Previous language is ',this.preLanguage[this.preLanguage.length-2]);
    // console.log('Language selected is ',this.currentLanguage);
    this.startLoading();
    this.popUpService.toast('Conversation will be updated soon.')
    const response = await this.response.translate(this.conversation,this.currentLanguage);
    if(response!==undefined){
    this.conversation = response;
    this.popUpService.toast('Conversation has been updated.');
  }
  else{
    this.popUpService.toast('Failed to update conversation language,please try again after sometime or restart.')
  }
    this.stopLoading();
    
  }



  async sendText() {
    if(this.textInput === ''){
        this.popUpService.toast('No message found');
        this.textInput = '';
    }
    else{

      this.conversation.push({
        "type": "text",
        "sender": "user",
        "timestamp": new Date().toISOString(),
        "content": this.textInput
      })
      this.scrollToBottom();
      this.startWaiting();
      const reply = await this.response.response(this.textInput,this.currentLanguage);
      this.conversation.push(reply);
      this.outputRef.nativeElement.value = '';
      this.textInput = '';
      this.mic = true;
      this.stopWaiting();
    }
     this.scrollToBottom();
  }

EnterPressed(event : KeyboardEvent){
  if(event.key === 'Enter'){
    this.sendText();
  }
}

showVid(startTime: number) {
  let video = document.getElementById('myVideo') as HTMLVideoElement | null;
  if (video) {
    video.addEventListener('loadedmetadata', function () {
      video.currentTime = startTime;
    });
  } else {
    console.error('Video element not found');
  }
}

changeMode(){
  this.modeFlag = !this.modeFlag;
}



}
