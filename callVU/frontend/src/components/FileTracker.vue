<template>
  <div class="container background-white">
    <div class="row">
      <div class="control col-8">
        <div class="control-title">
          <h1>Welcome</h1>
          <h1>to file tracker</h1>
        </div>
        <form class="top-padding">
          <fieldset>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input type="text" v-model="fileName" class="form-control" placeholder="Enter file path">
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <button type="button" @click="start()" v-if="!loggingOn" class="btn btn-success btn-lg btn-block"> <i class="fas fa-play"></i> Start</button>
        <button type="button" @click="end()" v-if="loggingOn" class="btn btn-danger btn-lg btn-block"> <i class="fas fa-stop"></i> End</button>
      </div>

      <div class="logger col-4 scrollbar" id="style-2">
        <h4 class="logger-title"><i class="fas fa-angle-right word-spacing"></i>tracking logs</h4>
        <hr class="color-green">
        <div v-for="(log,idx) in logs" :key="idx" class="log-row-container">
          <div :class="{'text-red': isRemove(log.action),'text-yellow': isChanged(log.action)}">
            > <i class="word-spacing" :class="{ 'fas fa-file': isFile(log.action) ,'fas fa-folder' : isFolder(log.action) }"></i>
            <span>"{{log.file_path}}" </span>
            <span>{{log.description}}.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logService from '../services/logService.js';

export default {
	data() {
		return {
			logs: [],
			fileName: '',
			loggingOn: false,
			timeOut: null
		};
	},
	methods: {
		isChanged(action) {
			return action === 'fileChange';
		},
		isRemove(action) {
			return action === 'unlinkFile' || action === 'unlinkDir';
		},
		isFolder(action) {
			return action === 'addDir' || action === 'unlinkDir';
		},
		isFile(action) {
			return (
				action === 'addFile' ||
				action === 'unlinkFile' ||
				action === 'fileChange'
			);
		},
		start() {
			this.loggingOn = true;
			logService.startTracking(this.fileName).then(() => {
				this.status();
				console.log(this.fileName);
			});
		},
		end() {
			this.loggingOn = false;
			clearTimeout(this.timeOut);
			logService.stopTracking(this.fileName).then(() => {
				console.log('stoping traking');
			});
		},
		status() {
			logService.status().then(logHistory => {
				this.logs = logHistory;
				this.timeOut = setTimeout(() => {
					this.status();
				}, 1000);
			});
		}
	}
};
</script>


