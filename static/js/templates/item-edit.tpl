<form role="form">
    <div class="form-group">
        <label>Title</label>
        <input name="title" type="text" class="form-control" value="<%= data.title %>"/>
    </div>
    <div class="form-group">
        <label>Content</label>
        <textarea name="content" class="form-control" rows="7"><%= data.content %></textarea>
    </div>
</form>