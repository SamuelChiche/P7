<template>
  <div class="card gedf-card">
    <div class="card-header text-center">
      Post
    </div>
    <div class="card-body">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          <div class="form-group">
            <label class="sr-only" for="message">post</label>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="What are you thinking?"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="btn-toolbar float-right">
        <div class="btn-group">
          <button type="submit" class="btn btn-primary">Partager</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Makeapost",
};
</script>